using MediatR;
using TodoApp.Api.Application.DTOs;
using TodoApp.Api.Application.Queries;
using TodoApp.Api.Infrastructure.Repositories;

namespace TodoApp.Api.Application.QueryHandlers
{
    public class GetTodoByIdQueryHandler : IRequestHandler<GetTodoByIdQuery, TodoDto?>
    {
        private readonly ITodoRepository _todoRepository;

        public GetTodoByIdQueryHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<TodoDto?> Handle(GetTodoByIdQuery request, CancellationToken cancellationToken)
        {
            var todo = await _todoRepository.GetByIdAsync(request.Id);
            if (todo == null) return null;

            return new TodoDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                IsCompleted = todo.IsCompleted,
                CreatedAt = todo.CreatedAt
            };
        }
    }
}