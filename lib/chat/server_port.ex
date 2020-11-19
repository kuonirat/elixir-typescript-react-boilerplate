defmodule Chat.ServerPort do
  use Agent

  @min_port 7654
  @max_port 65535

  def start_link(_opts) do
    Agent.start_link(fn -> @min_port end, name: __MODULE__)
  end

  def next() do
    Agent.get_and_update(__MODULE__, fn port -> {
      port,
      max(@min_port, rem(port + 1, @max_port + 1))
    } end)
  end
end
