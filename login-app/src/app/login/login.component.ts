import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  users!: SocialUser;
  loggedIn!: boolean;
  constructor(private http: HttpClient, 
    private router: Router,
    private authService: SocialAuthService) { }
  

  ngOnInit() {
    this.authService.authState.subscribe((users) => {
      this.users = users;
      this.loggedIn = (users != null);
      console.log(this.users);
      localStorage.setItem('users',JSON.stringify(this.users));
      this.router.navigate(['/signin']);
    });
  }

  authenticate(): void {
    const user = { email: this.email, password: this.password };
    this.http.post<any>('/api/login/authenticate', user).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile']);
      },
      error => {
        this.error = error.error;
      }
    );
  }
}
