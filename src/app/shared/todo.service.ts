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
    private authhh:AuthService,
    private fireauth: AngularFireAuth,

  ) {
    this.getUid()
    this.firestoreCollection = firestore.collection('todo', ref => ref.where("user_id", "==", this.uid))
  }
  getUid() {
    this.fireauth.currentUser.then((data)=>{
      this.uid = data?.uid;
    })
  }
  addToDo(title:string,user_id:string|undefined){
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
