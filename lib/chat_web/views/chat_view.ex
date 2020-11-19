defmodule ChatWeb.ChatView do
  use ChatWeb, :view

  def render("port.json", %{ port: port }) do
    %{ port: port }
  end

  def render("message.json", %{ id: id }) do
    %{ id: id }
  end

  def render("error.json", %{ message: message }) do
    %{ error: message }
  end
end
