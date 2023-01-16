import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private auth : AuthService,
    private todo:TodoService
  ) { }

  ngOnInit(): void {
  }
  login() {
    if(this.email !== '' && this.password !== ''){
      this.auth.login(this.email, this.password);
      this.email = '';
      this.password = '';
    }
  }
  getUID(){
    this.todo.getUid();
  }

}
