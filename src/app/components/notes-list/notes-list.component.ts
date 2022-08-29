import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notes } from 'src/app/interfaces/notes';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  @Input() notes!: Notes;
  @Input() clickData!: Notes;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {}

  deleteBtn() {
    this.todosService.deleteTodo(this.clickData._id).subscribe(console.log);
  }
}
