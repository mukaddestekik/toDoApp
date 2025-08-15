using MediatR;
using TodoApp.Api.Application.DTOs;

namespace TodoApp.Api.Application.Queries
{
    public class GetAllTodosQuery : IRequest<IEnumerable<TodoDto>>
    {
    }
}