import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(public auth:AuthService,private router: Router) {
    
  }
  email: string;
  password: string;

  onSubmit() {
    this.auth.register(this.email, this.password)
  }

  ngOnInit() {
    this.auth.email$.subscribe(email => {
      if (this.auth.email) {
        this.router.navigate(['/posts']);
      };
    });
  }
}
