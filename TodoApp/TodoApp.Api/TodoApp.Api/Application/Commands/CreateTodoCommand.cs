using MediatR;
using TodoApp.Api.Application.DTOs;

namespace TodoApp.Api.Application.Commands
{
    public class CreateTodoCommand : IRequest<TodoDto>
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
    }
}