using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Domain.Entities;
using TodoApp.Api.Infrastructure.Data;

namespace TodoApp.Api.Infrastructure.Repositories
{
    public class TodoRepository : ITodoRepository
    {
        private readonly TodoDbContext _context;

        public TodoRepository(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<TodoEntity?> GetByIdAsync(Guid id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task<IEnumerable<TodoEntity>> GetAllAsync()
        {
            return await _context.Todos.OrderByDescending(t => t.CreatedAt).ToListAsync();
        }

        public async Task<TodoEntity> AddAsync(TodoEntity entity)
        {
            entity.Id = Guid.NewGuid();
            entity.CreatedAt = DateTime.UtcNow;

            _context.Todos.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<TodoEntity> UpdateAsync(TodoEntity entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = await _context.Todos.FindAsync(id);
            if (entity != null)
            {
                _context.Todos.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}