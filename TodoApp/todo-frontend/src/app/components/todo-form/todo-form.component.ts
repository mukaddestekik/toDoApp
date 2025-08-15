// src/app/components/todo-form/todo-form.component.ts
import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {
  @Input() todo: Todo | null = null;
  @Input() isEditing = false;
  @Output() todoSubmit = new EventEmitter<CreateTodoRequest | UpdateTodoRequest>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  description = '';
  isCompleted = false;

  ngOnInit() {
    this.loadTodoData();
  }

  ngOnChanges() {
    this.loadTodoData();
  }

  private loadTodoData() {
    if (this.todo) {
      this.title = this.todo.title;
      this.description = this.todo.description;
      this.isCompleted = this.todo.isCompleted;
    } else if (!this.isEditing) {
      this.resetForm();
    }
  }

  onSubmit() {
    if (this.title.trim() && this.description.trim()) {
      if (this.isEditing && this.todo) {
        const updateRequest: UpdateTodoRequest = {
          id: this.todo.id,
          title: this.title.trim(),
          description: this.description.trim(),
          isCompleted: this.isCompleted
        };
        this.todoSubmit.emit(updateRequest);
      } else {
        const createRequest: CreateTodoRequest = {
          title: this.title.trim(),
          description: this.description.trim(),
          isCompleted: this.isCompleted
        };
        this.todoSubmit.emit(createRequest);
      }
      this.resetForm();
    }
  }

  onCancel() {
    this.resetForm();
    this.cancel.emit();
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.isCompleted = false;
  }
}