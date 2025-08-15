using MediatR;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Application.Commands;
using TodoApp.Api.Application.DTOs;
using TodoApp.Api.Application.Queries;

namespace TodoApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TodoController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoDto>>> GetAll()
        {
            var query = new GetAllTodosQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetById(Guid id)
        {
            var query = new GetTodoByIdQuery { Id = id };
            var result = await _mediator.Send(query);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<TodoDto>> Create([FromBody] CreateTodoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var command = new CreateTodoCommand
            {
                Title = dto.Title,
                Description = dto.Description
            };

            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TodoDto>> Update(Guid id, [FromBody] UpdateTodoDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var command = new UpdateTodoCommand
            {
                Id = id,
                Title = dto.Title,
                Description = dto.Description,
                IsCompleted = dto.IsCompleted
            };

            try
            {
                var result = await _mediator.Send(command);
                return Ok(result);
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var command = new DeleteTodoCommand { Id = id };
            await _mediator.Send(command);
            return NoContent();
        }
    }
}