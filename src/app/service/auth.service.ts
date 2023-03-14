import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public email: string;

  public token: string;

  public message: string;

  email$ = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) { 
    let credentialStr = localStorage.getItem("auth")
    if (credentialStr) {
      let credential = JSON.parse(credentialStr)
      this.email = credential.email;
      this.token = credential.token;
    }
  }

  public login(email: string, password: string): void {
    this.message = ""
    this.http.post<any>("http://localhost:5000/auth/login", {
      email: email,
      password:password
    }).subscribe({
      next: response => {
        this.email = response.email
        this.token = response.token
        this.saveCredentials()
        this.email$.next(this.email)
        this.router.navigate(['/posts'])
      },
      error: error => {
        this.message = "Login failed. Check username or password."
      }
    })
  }

  public logout(): void {
    this.message = ""
    this.email = null;
    this.saveCredentials()
    this.email$.next(this.email)
  }

  public register(email: string, password: string): void {
    this.message = ""
    this.http.post<any>("http://localhost:5000/auth/register", {
      email: email,
      password:password
    }).subscribe({
      next: response => {
        this.email = response.email
        this.token = response._id
        this.saveCredentials
        this.email$.next(this.email)
        this.router.navigate(['/posts'])
      },
      error: error => {
        this.message = "Failed, email already exist."
      }
    })
  }

  private saveCredentials() {
    localStorage.setItem("auth", JSON.stringify( {
      email: this.email,
      token:this.token
    }))
  }
}
