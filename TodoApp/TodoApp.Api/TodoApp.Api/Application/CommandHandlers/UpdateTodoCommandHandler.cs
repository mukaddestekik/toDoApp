using MediatR;
using TodoApp.Api.Application.Commands;
using TodoApp.Api.Application.DTOs;
using TodoApp.Api.Infrastructure.Repositories;

namespace TodoApp.Api.Application.CommandHandlers
{
    public class UpdateTodoCommandHandler : IRequestHandler<UpdateTodoCommand, TodoDto>
    {
        private readonly ITodoRepository _todoRepository;

        public UpdateTodoCommandHandler(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        public async Task<TodoDto> Handle(UpdateTodoCommand request, CancellationToken cancellationToken)
        {
            var existingTodo = await _todoRepository.GetByIdAsync(request.Id);
            if (existingTodo == null)
            {
                throw new ArgumentException($"Todo with ID {request.Id} not found.");
            }

            existingTodo.Title = request.Title;
            existingTodo.Description = request.Description;
            existingTodo.IsCompleted = request.IsCompleted;

            var updatedTodo = await _todoRepository.UpdateAsync(existingTodo);

            return new TodoDto
            {
                Id = updatedTodo.Id,
                Title = updatedTodo.Title,
                Description = updatedTodo.Description,
                IsCompleted = updatedTodo.IsCompleted,
                CreatedAt = updatedTodo.CreatedAt
            };
        }
    }
}