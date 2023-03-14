import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{
  constructor(public auth:AuthService,private router: Router) {
    
  }
  email: string;
  password: string;

  onSubmit() {
    this.auth.login(this.email, this.password)
  }

  
  ngOnInit() {
    this.auth.email$.subscribe(email => {
      if (this.auth.email) {
        this.router.navigate(['/posts']);
      };
    });
  }
}
