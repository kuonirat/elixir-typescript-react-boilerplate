defmodule ChatWeb.ChatController do
  use ChatWeb, :controller
  require Logger
  alias Phoenix.PubSub

  def start(conn, _params) do
    port = Chat.ServerPort.next()
    notify_pid = self()

    Task.Supervisor.start_child(Chat.ServersSupervisor, fn ->

      Task.start_link(fn ->
        PubSub.subscribe :chat_events, Chat.Server.get_channel_name(port)
        loop_broadcast(port)
      end)

      Chat.Server.accept(port, notify_pid)
    end)

    receive do
      { :server_status, :ok } -> render(conn, "port.json", %{port: port})
      { :server_status, :error } ->
        conn
          |> put_status(500)
          |> render("error.json", %{message: "Cannot start server on port #{port}"})
    end
  end

  def create_message(conn, %{"port" => port, "text" => text}) do
    channel_name = Chat.Server.get_channel_name(port)
    message_id = UUID.uuid4()
    message = %Chat.Message{ id: message_id, text: text, source: :react }
    Logger.debug("Received new message #{inspect(message)} from react. Broadcasting to web channel #{channel_name} and telnet clients (port #{port})")
    ChatWeb.Endpoint.broadcast!(
      channel_name,
      "new_message",
      %{
        id: message_id,
        text: text
      }
    )
    PubSub.broadcast :chat_events, channel_name, { :new_message, message }
    render(conn, "message.json", %{id: message_id})
  end

  defp loop_broadcast(port) do

    receive do
      { :new_message, message = %Chat.Message{ id: id, text: text, source: :telnet } } ->
        channel_name = Chat.Server.get_channel_name(port)
        Logger.debug("Received new message #{inspect(message)} from telnet (port #{port}). Broadcasting to web channel #{channel_name}")
        ChatWeb.Endpoint.broadcast!(
          channel_name,
          "new_message",
          %{
            id: id,
            text: text
          }
        )
    end

    loop_broadcast(port)
  end
end
