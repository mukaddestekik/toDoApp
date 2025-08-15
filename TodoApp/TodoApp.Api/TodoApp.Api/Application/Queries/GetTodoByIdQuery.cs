using MediatR;
using TodoApp.Api.Application.DTOs;

namespace TodoApp.Api.Application.Queries
{
    public class GetTodoByIdQuery : IRequest<TodoDto?>
    {
        public Guid Id { get; set; }
    }
}