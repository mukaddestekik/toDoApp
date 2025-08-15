// src/app/components/todo-item/todo-item.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo-item" [class.completed]="todo.isCompleted">
      <div class="todo-content">
        <div class="todo-header">
          <div class="todo-title-section">
            <span class="todo-id">#{{ todo.id }}</span>
            <h4 class="todo-title" [class.strikethrough]="todo.isCompleted">
              {{ todo.title }}
            </h4>
          </div>
          <div class="todo-actions">
            <button 
              (click)="onToggleComplete()" 
              class="btn btn-toggle"
              [class.completed]="todo.isCompleted"
              [title]="todo.isCompleted ? 'Tamamlanmadı olarak işaretle' : 'Tamamlandı olarak işaretle'">
              <span *ngIf="todo.isCompleted">✓</span>
              <span *ngIf="!todo.isCompleted">○</span>
            </button>
            
            <button 
              (click)="onEdit()" 
              class="btn btn-edit"
              title="Düzenle">
              ✏️
            </button>
            
            <button 
              (click)="onDelete()" 
              class="btn btn-delete"
              title="Sil">
              ❌
            </button>
          </div>
        </div>
        
        <p class="todo-description" [class.strikethrough]="todo.isCompleted">
          {{ todo.description }}
        </p>
        
        <div class="todo-meta">
          <span class="status-badge" [class.completed]="todo.isCompleted">
            <span *ngIf="todo.isCompleted">Tamamlandı</span>
            <span *ngIf="!todo.isCompleted">Devam Ediyor</span>
          </span>
          
          <div class="todo-dates" *ngIf="todo.createdAt">
            <small *ngIf="todo.createdAt" class="created-date">
              Oluşturuldu: {{ todo.createdAt | date:'dd/MM/yyyy HH:mm' }}
            </small>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<Todo>();

  onEdit() {
    this.edit.emit(this.todo);
  }

  onDelete() {
    if (confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      this.delete.emit(this.todo.id);
    }
  }

  onToggleComplete() {
    const updatedTodo = { ...this.todo, isCompleted: !this.todo.isCompleted };
    this.toggleComplete.emit(updatedTodo);
  }
}