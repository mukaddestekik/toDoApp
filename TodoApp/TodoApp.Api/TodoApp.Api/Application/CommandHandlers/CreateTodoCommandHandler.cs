using MediatR;
using TodoApp.Api.Application.Commands;
using TodoApp.Api.Application.DTOs;
using TodoApp.Api.Domain.Entities;
using TodoApp.Api.Infrastructure.Repositories;

namespace TodoApp.Api.Application.CommandHandlers
{
    public class CreateTodoCommandHandler : IRequestHandler<CreateTodoCommand, TodoDto>
    {
        private readonly ITodoRepository _todoRepository;

        public CreateTodoCommandHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<TodoDto> Handle(CreateTodoCommand request, CancellationToken cancellationToken)
        {
            var todoEntity = new TodoEntity
            {
                Title = request.Title,
                Description = request.Description,
                IsCompleted = false
            };

            var createdTodo = await _todoRepository.AddAsync(todoEntity);

            return new TodoDto
            {
                Id = createdTodo.Id,
                Title = createdTodo.Title,
                Description = createdTodo.Description,
                IsCompleted = createdTodo.IsCompleted,
                CreatedAt = createdTodo.CreatedAt
            };
        }
    }
}