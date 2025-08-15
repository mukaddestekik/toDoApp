// src/app/services/todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5264/api/todo'; // Backend API URL'inizi buraya yazın

  constructor(private http: HttpClient) { }

  // Tüm todoları getir
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // ID'ye göre todo getir
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  // Yeni todo oluştur
  createTodo(todo: CreateTodoRequest): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  // Todo güncelle
  updateTodo(id: number, todo: UpdateTodoRequest): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  // Todo sil
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}