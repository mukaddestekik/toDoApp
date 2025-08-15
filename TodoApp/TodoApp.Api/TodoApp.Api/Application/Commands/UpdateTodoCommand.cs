using MediatR;
using TodoApp.Api.Application.DTOs;

namespace TodoApp.Api.Application.Commands
{
    public class UpdateTodoCommand : IRequest<TodoDto>
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}