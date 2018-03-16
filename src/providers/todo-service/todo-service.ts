import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoService {

  private todos = ['Hello'];
  private archivedTodos = [];

  constructor(public http: HttpClient) {
    console.log('Hello TodoServiceProvider Provider');
  }

  // To send all the data to the view Component
  getTodos(){
    return this.todos;
  }

  // Get all the archived todo
  getArchivedTodos(){
    return this.archivedTodos;
  }

  // To delete and store the deleted todo in the archive
  archivedTodo(todoIndex){
    let todoToBeArchived = this.todos[todoIndex];
    this.todos.splice(todoIndex, 1);
    this.archivedTodos.push(todoToBeArchived);
  }
  // To store the todo
  addTodo(todoText){
    this.todos.push(todoText);
  }
  // To edit todo
  editTodo(todo, todoIndex){
    this.todos[todoIndex] = todo;
  }

}
