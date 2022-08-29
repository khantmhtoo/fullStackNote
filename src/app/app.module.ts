import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodosService } from './services/todos.service';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { InputFormComponent } from './components/input-form/input-form.component';
import { ShortDesPipe } from './pipes/short-des.pipe';

@NgModule({
  declarations: [AppComponent, NotesListComponent, InputFormComponent, ShortDesPipe],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [TodosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
