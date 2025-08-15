using System.ComponentModel.DataAnnotations;

namespace TodoApp.Api.Application.DTOs
{
    public class CreateTodoDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }
    }
}