using MediatR;

namespace TodoApp.Api.Application.Commands
{
    public class DeleteTodoCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}