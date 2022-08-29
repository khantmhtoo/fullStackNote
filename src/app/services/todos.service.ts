import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Notes } from '../interfaces/notes';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private baseUrl: string = 'http://localhost:3000/todos/';
  // Should be noteList but --> keeping consistent because I don't want to change it
  private todoList!: any;
  private todoListSubject$ = new BehaviorSubject(this.todoList);
  todoList$ = this.todoListSubject$.asObservable();

  constructor(private readonly http: HttpClient) {}

  getTodo() {
    return this.http.get(this.baseUrl).pipe(
      tap<Notes>((data) => {
        this.todoList = data;
        this.todoListSubject$.next(this.todoList);
      })
    );
  }

  addTodo(addData: Notes) {
    return this.http.post(this.baseUrl, addData).pipe(
      tap<Notes>((data) => {
        this.todoList = [...this.todoList, data];
        this.todoListSubject$.next(this.todoList);
      })
    );
  }

  deleteTodo(deleteId: any) {
    return this.http.delete(this.baseUrl + deleteId).pipe(
      tap<any>((_) => {
        this.getTodo();
        // this.todoList = data;
        // this.todoListSubject$.next(this.todoList);
      })
    );
  }

  patchTodo(patchId: string, content: {}) {
    return this.http.patch(this.baseUrl + patchId, content);
  }
}
