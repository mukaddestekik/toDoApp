using MediatR;
using TodoApp.Api.Application.Commands;
using TodoApp.Api.Infrastructure.Repositories;

namespace TodoApp.Api.Application.CommandHandlers
{
    public class DeleteTodoCommandHandler : IRequestHandler<DeleteTodoCommand>
    {
        private readonly ITodoRepository _todoRepository;

        public DeleteTodoCommandHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task Handle(DeleteTodoCommand request, CancellationToken cancellationToken)
        {
            await _todoRepository.DeleteAsync(request.Id);
        }
    }
}