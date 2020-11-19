defmodule ChatWeb.ChatChannel do
  use Phoenix.Channel
  require Logger

  def join("chat:" <> _port, _message, socket) do
    {:ok, socket}
  end

  def join(topic = "topic:subtopic", message, socket) do
    Logger.warn("Unnecessary #{topic} join with message #{message}")
    {:ok, socket}
  end

  def handle_in("new_message", mmm, socket) do
    Logger.debug("handle_in new_message #{mmm}")
    {:noreply, socket}
  end
end
