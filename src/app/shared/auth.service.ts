import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid:string | undefined ;
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
  ) {
this.getUid()
  }

  getUid() {
    this.fireauth.currentUser.then((data)=>{
      this.uid = data?.uid;
    })
  }
  gett(){
    let y;
    this.fireauth.currentUser.then(x => y = x?.uid);
    return y;
  }

  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( () => {
      this.getUid()
      console.log(this.uid)
      localStorage.setItem('token','true');
      this.router.navigate(['dashboard']);
    }, err => {
      alert("Somethng went wrong");
      this.router.navigate(['/login'])
    })
  }



  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then( ()=> {
      alert('Registration successful');
      this.router.navigate(['/login']);
    },err => {
      alert(err.message)
      this.router.navigate(['/register']);
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
