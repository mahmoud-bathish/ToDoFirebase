import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todos: any[] = [];
  constructor(
    private todosvc:TodoService
  ) { }

  ngOnInit(): void {
    this.todosvc.firestoreCollection.valueChanges({idField:'id'})
    .subscribe(item=>{
      this.todos = item.sort((a:any,b:any)=>{
        return a.isDone -b.isDone
        });
    })
  }

  onClick(titleInput:HTMLInputElement){
   if(titleInput.value){
    this.todosvc.addToDo( titleInput.value);
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

