import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth.service';

// order.setUser_id(mAuth.getCurrentUser().getUid());

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  uid:string | undefined ='' ;
  firestoreCollection: AngularFirestoreCollection;
  constructor(
    private firestore:AngularFirestore,
    private fireauth: AngularFireAuth,

  ) {
    this.firestoreCollection = firestore.collection('todo')
  }

  getUid() {
    this.fireauth.currentUser.then((data:any)=>{
      localStorage.setItem('token',data.uid)

    })
  }

  addToDo(title:string,user_id:any){
    this.firestoreCollection.add({
      title,
      isDone:false,
      user_id,
    })
  }
  updateTodoStatus(id:string,newStatus:boolean){
    this.firestoreCollection.doc(id).update({isDone:newStatus})
  }
  deleteTodo(id:string){
    this.firestoreCollection.doc(id).delete()
  }

}
