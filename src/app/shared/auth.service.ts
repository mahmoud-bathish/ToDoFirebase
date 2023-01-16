import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid:string | undefined ;
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private todosvc:TodoService
  ) {
  }

  gett(){
    let y;
    this.fireauth.currentUser.then(x => y = x?.uid);
    return y;
  }
  clearLocalStorage(){
    localStorage.clear()
  }

 isLoggedIn(): boolean {
    const user = localStorage.getItem('token');
    return user !== null ? true : false;
  }

  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( (res) => {
      // this.todosvc.getUid();
      this.router.navigate(['dashboard']);
    }, err => {
      alert("Il ya un error: " + err.message);
      this.router.navigate(['/login'])
    })
  }

  forgotPass(email: string){
    this.fireauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verifyEmail']);
    },err=>{
      alert("Something went wrong !")
    })
  }

  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(res=> {
      alert('Registration successful');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    },err => {
      alert(err.message)
      this.router.navigate(['/register']);
    })
  }

  sendEmailForVerification(user : any){
      user.sendEmailVerification().then((res:any) => {
        this.router.navigate(['/verifyEmail']);

    },(err:any)=>{
      alert('Something went wrong !');
    })
  }

  logout(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },err => {
      alert(err.message)
    })
  }

}
