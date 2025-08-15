// src/app/components/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoFormComponent, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error: string | null = null;
  editingTodo: Todo | null = null;
  isEditing = false;
  filter = 'all'; // 'all', 'completed', 'pending'
  searchTerm = '';
  searchId = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.loading = true;
    this.error = null;
    
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Görevler yüklenirken bir hata oluştu.';
        this.loading = false;
        console.error('Error loading todos:', error);
      }
    });
  }

  onTodoSubmit(todoData: CreateTodoRequest | UpdateTodoRequest) {
    if (this.isEditing && 'id' in todoData) {
      // Güncelleme
      this.todoService.updateTodo(todoData.id, todoData as UpdateTodoRequest).subscribe({
        next: (updatedTodo) => {
          const index = this.todos.findIndex(t => t.id === updatedTodo.id);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
          }
          this.cancelEdit();
        },
        error: (error) => {
          this.error = 'Görev güncellenirken bir hata oluştu.';
          console.error('Error updating todo:', error);
        }
      });
    } else {
      // Yeni ekleme
      this.todoService.createTodo(todoData as CreateTodoRequest).subscribe({
        next: (newTodo) => {
          this.todos.unshift(newTodo);
        },
        error: (error) => {
          this.error = 'Görev eklenirken bir hata oluştu.';
          console.error('Error creating todo:', error);
        }
      });
    }
  }

  onEditTodo(todo: Todo) {
    this.editingTodo = todo;
    this.isEditing = true;
  }

  onDeleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== id);
      },
      error: (error) => {
        this.error = 'Görev silinirken bir hata oluştu.';
        console.error('Error deleting todo:', error);
      }
    });
  }

  onToggleComplete(todo: Todo) {
    const updateRequest: UpdateTodoRequest = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      isCompleted: !todo.isCompleted
    };

    this.todoService.updateTodo(todo.id, updateRequest).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (error) => {
        this.error = 'Görev durumu güncellenirken bir hata oluştu.';
        console.error('Error toggling todo:', error);
      }
    });
  }

  cancelEdit() {
    this.editingTodo = null;
    this.isEditing = false;
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  get filteredTodos(): Todo[] {
    let filtered = this.todos;

    // Filter by status
    switch (this.filter) {
      case 'completed':
        filtered = filtered.filter(todo => todo.isCompleted);
        break;
      case 'pending':
        filtered = filtered.filter(todo => !todo.isCompleted);
        break;
    }

    // Search by title or description
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(todo => 
        todo.title.toLowerCase().includes(searchLower) ||
        todo.description.toLowerCase().includes(searchLower)
      );
    }

    // Search by ID
    if (this.searchId.trim()) {
      const searchIdNumber = parseInt(this.searchId.trim());
      if (!isNaN(searchIdNumber)) {
        filtered = filtered.filter(todo => todo.id === searchIdNumber);
      }
    }

    return filtered;
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.isCompleted).length;
  }

  get pendingCount(): number {
    return this.todos.filter(todo => !todo.isCompleted).length;
  }

  clearError() {
    this.error = null;
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchId = '';
  }

  trackByTodoId(index: number, todo: Todo): number {
    return todo.id;
  }
}