import { Component, OnInit, ViewChild } from '@angular/core';
import { Notes } from './interfaces/notes';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('theClickNote') theClickNote!: Notes;
  notesList: any;
  clickData: any;

  constructor(private readonly todoService: TodosService) {}

  ngOnInit(): void {
    this.todoService.getTodo().subscribe();

    this.todoService.todoList$.subscribe((data) => {
      this.clickData = '';
      this.notesList = data;
    });
  }

  getClickData(clicked: any) {
    this.clickData = clicked.notes;
  }
}
