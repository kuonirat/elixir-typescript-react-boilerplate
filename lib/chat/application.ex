defmodule Chat.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      # Chat.Repo,
      # Start the Telemetry supervisor
      ChatWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Chat.PubSub},
      # Start the Endpoint (http/https)
      ChatWeb.Endpoint,
      {Task.Supervisor, name: Chat.ServersSupervisor, strategy: :one_for_one},
      {Task.Supervisor, name: Chat.SocketReadSupervisor, strategy: :one_for_one},
      Chat.ServerPort,
      Supervisor.child_spec({Phoenix.PubSub, name: :chat_events}, id: :raw_pub_subs)
      # Start a worker by calling: Chat.Worker.start_link(arg)
      # {Chat.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Chat.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ChatWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
