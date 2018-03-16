import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';


import { TodoService } from '../../providers/todo-service/todo-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // To store all the todos
  public todos = [];
  public reorderIsEnabled = false;

  constructor(private todoService: TodoService, public navCtrl: NavController, private alertController: AlertController, private toastController: ToastController) {
    this.todos = this.todoService.getTodos();
  }

  // ArchivedTodosPage Navigation
  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  // Item reordering
  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  // Toggle reorder
  toggleReorder(){
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  // To open alert window
  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title: "Add A Todo",
      message: "Enter your todo.",
      inputs:[
        {
            type:"text",
            name: "addTodoInput"
        }
      ],
      buttons:[
        {
          text:"Cancel"
        },
        {
          text: "Add Todo",
          // To input the todo in the list
          handler: (inputData) => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoService.addTodo(todoText);
            addTodoAlert.onDidDismiss(() => {
              // To prepare the toast handler
              let addTodoToast = this.toastController.create({
                message: "Todo is Added",
                duration: 2500
              });
              // to View the Toast handler
              addTodoToast.present();
            });
          }
        }
      ]
    });
    addTodoAlert.present();
  }
  // To delete Todo from the service
  archiveTodo(todoIndex){
    this.todoService.archivedTodo(todoIndex);
  }

  // To edit the todos
  editTodo(todoIndex){
    let editTodoAlert = this.alertController.create({
      title: "Edit Todo",
      message: "Edit your todo.",
      inputs:[
        {
            type:"text",
            name: "editTodoInput",
            value: this.todos[todoIndex]
        }
      ],
      buttons:[
        {
          text:"Cancel"
        },
        {
          text: "Edit Todo",
          // To input the todo in the list
          handler: (inputData) => {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoService.editTodo(todoText, todoIndex);
            editTodoAlert.onDidDismiss(() => {
              // To prepare the toast handler
              let editTodoToast = this.toastController.create({
                message: "Todo is Updated",
                duration: 2500
              });
              // to View the Toast handler
              editTodoToast.present();
            });
          }
        }
      ]
    });
    editTodoAlert.present();
  }


}
