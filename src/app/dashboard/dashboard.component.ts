import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  todos: any[] = [];
  uid: string|undefined = ''
  constructor(
    private todosvc:TodoService,
    private authsvc:AuthService,
    private fireauth: AngularFireAuth,


  ) { }

  ngOnInit(): void {
    this.todosvc.firestoreCollection.valueChanges({idField:'id'})
    .subscribe(item=>{
      this.todos = item.sort((a:any,b:any)=>{
        return a.isDone -b.isDone
      });
    })
    // this.getUID()
    // this.authsvc.getUid();
  }
  // getUID(){
  //   this.fireauth.currentUser.then((data)=>{
  //     this.uid = data?.uid;
  //   })
  // }
//db.collection('Users', ref => ref.where("age", ">=", "18")).valueChanges();

  onClick(titleInput:HTMLInputElement){
    this.authsvc.getUid()
    console.log("mn el Service  "  +this.authsvc.uid)
   if(titleInput.value){
    this.todosvc.addToDo( titleInput.value,this.uid);
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

