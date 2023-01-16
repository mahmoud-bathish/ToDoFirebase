import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todos: any[] = [];
  constructor(
    private todosvc:TodoService,
    private firestore:AngularFirestore,
  ) { }

  ngOnInit(): void {
    console.log(localStorage.getItem('token'))
    this.firestore.collection('todo',ref => ref.where("user_id", "==",localStorage.getItem('token')) ).valueChanges({idField:'id'})
    .subscribe(item=>{
      this.todos = item.sort((a:any,b:any)=>{
        return a.isDone -b.isDone
      });
    })
  }

  onClick(titleInput:HTMLInputElement){
   if(titleInput.value){
    this.todosvc.addToDo( titleInput.value,localStorage.getItem('token'));
    titleInput.value = '';
   }
  }
  onStatusChange(id:string,newStatus:boolean){
    this.todosvc.updateTodoStatus(id,newStatus)
  }
  onDelete(id:string){
    this.todosvc.deleteTodo(id);
  }

}

