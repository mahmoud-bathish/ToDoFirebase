import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection;
  constructor(
    private firestore:AngularFirestore,
  ) {
    this.firestoreCollection = firestore.collection('todo')
  }
  addToDo(title:string){
    this.firestoreCollection.add({
      title,
      isDone:false
    })
  }
  updateTodoStatus(id:string,newStatus:boolean){
    this.firestoreCollection.doc(id).update({isDone:newStatus})
  }
  deleteTodo(id:string){
    this.firestoreCollection.doc(id).delete()
  }

}
