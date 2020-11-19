defmodule Chat.Server do
  require Logger
  alias Phoenix.PubSub

  def accept(port, notify_pid) do
    case :gen_tcp.listen(
      port,
      [:binary, packet: :line, active: false, reuseaddr: true]
    ) do
      { :ok, socket } ->
        Logger.info "Accepting connections on port #{port}"
        send notify_pid, { :server_status, :ok }
        loop_acceptor(socket, port)
      { :error, e } ->
        Logger.error "Cannot start server on port #{port}: #{e}"
        send notify_pid, { :server_status, :error }
    end
  end

  def get_channel_name(port) do
    "chat:" <> Integer.to_string(port)
  end

  defp loop_acceptor(socket, port) do
    {:ok, client} = :gen_tcp.accept(socket)

    {:ok, pid} = Task.Supervisor.start_child(Chat.SocketReadSupervisor, fn ->
      Logger.info("Serving new connection on port #{port}")

      Task.start_link(fn ->
        PubSub.subscribe :chat_events, get_channel_name(port)
        loop_socket_write(client, port)
      end)

      loop_socket_read(client, port)
    end)

    :ok = :gen_tcp.controlling_process(client, pid)

    loop_acceptor(socket, port)
  end

  defp loop_socket_read(socket, port) do
    socket
    |> read_line()
    |> broadcast_message(port)

    loop_socket_read(socket, port)
  end

  defp read_line(socket) do
    case :gen_tcp.recv(socket, 0) do
      {:ok, data} -> data
      {:error, :closed} ->
        # fail the process, we're ok with that
        raise "Socket closed by client"
    end
  end

  defp broadcast_message(line, port) do
    channel_name = get_channel_name(port)
    message = %Chat.Message{ id: UUID.uuid4(), text: String.trim_trailing(line), source: :telnet }
    PubSub.broadcast :chat_events, channel_name, {:new_message, message }
    line
  end

  defp loop_socket_write(socket, port) do

    receive do
      { :new_message, %Chat.Message { text: text, source: :react } } ->
        Logger.debug("Writing #{text} to a socket from port #{port}")
        write_line(text <> "\r\n", socket)
    end

    loop_socket_write(socket, port)
  end

  defp write_line(line, socket) do
    :gen_tcp.send(socket, line)
  end
end
