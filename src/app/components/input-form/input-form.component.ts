import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Notes } from 'src/app/interfaces/notes';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit {
  form!: FormGroup;
  @Input() noteData!: any;
  @Output() updatedState = new EventEmitter();

  get title() {
    return this.form.get('title') as FormControl;
  }

  get bodyContext() {
    return this.form.get('bodyContext') as FormControl;
  }

  constructor(
    private readonly todosService: TodosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      bodyContext: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.title.value !== '' && this.bodyContext.value !== '') {
      this.todosService
        .addTodo({
          title: this.title.value,
          bodyContext: this.bodyContext.value,
        })
        .subscribe(console.log);
      this.form.reset();
    }
  }

  onUpdate() {
    this.todosService
      .patchTodo(this.noteData._id, this.form.value)
      .subscribe(console.log);
    this.form.reset();
  }
}
