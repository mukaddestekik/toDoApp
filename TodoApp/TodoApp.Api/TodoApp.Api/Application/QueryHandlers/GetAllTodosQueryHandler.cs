using MediatR;
using TodoApp.Api.Application.DTOs;
using TodoApp.Api.Application.Queries;
using TodoApp.Api.Infrastructure.Repositories;

namespace TodoApp.Api.Application.QueryHandlers
{
    public class GetAllTodosQueryHandler : IRequestHandler<GetAllTodosQuery, IEnumerable<TodoDto>>
    {
        private readonly ITodoRepository _todoRepository;

        public GetAllTodosQueryHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<IEnumerable<TodoDto>> Handle(GetAllTodosQuery request, CancellationToken cancellationToken)
        {
            var todos = await _todoRepository.GetAllAsync();

            return todos.Select(todo => new TodoDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.IsCompleted,
                CreatedAt = todo.CreatedAt
            });
        }
    }
}