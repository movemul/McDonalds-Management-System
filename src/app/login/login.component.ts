import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
 imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 constructor(
  private http: HttpClient,
  private router: Router
) { }

  username: string = '';

  password: string = '';

 login() {

  const loginData = {
    username: this.username,
    password: this.password
  };

  this.http.post(
    'https://localhost:7146/api/Auth/login',
    loginData
  ).subscribe({
    next: (response: any) => {
localStorage.setItem('token', response.token);
this.router.navigate(['/dashboard']);
},
    error: (error) => {
  alert(JSON.stringify(error));
}
  });

}
  }

