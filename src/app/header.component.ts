import { AuthService } from './service/auth.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
  
export class HeaderComponent  implements OnInit{

  isLogined: boolean;

  constructor(public auth: AuthService) {
    this.isLogined = auth.email ? true : false;
  }

  onLogout() {
    this.auth.logout
  }

  ngOnInit() {
    this.auth.email$.subscribe(email => {
      console.log(email)
      this.isLogined = email ? true : false;
    });
  }

}
