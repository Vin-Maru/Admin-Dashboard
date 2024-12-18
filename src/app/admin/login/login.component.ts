import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;  // Loading state

  constructor(private http: HttpClient, private router: Router,
    private userService: UserService
  ) {}

  login() {
    if (this.email && this.password) {
      this.isLoading = true;  // Set loading state to true
      const loginUrl = 'http://34.28.208.64:8080/kyc/auth/login';

      this.http.post(loginUrl, { email: this.email, password: this.password })
        .subscribe({
          next: (response: any) => {
            this.errorMessage = '';
            this.isLoading = false; 
            
         
            const token = response.payload.token;  // payload respond found
            if (token) {
              localStorage.setItem('authToken', token);  // Save token in local storage
              this.email = ''; // Clear email input
              this.password = ''; // Clear password input
              this.router.navigate(['/admin/dashboard']);  // Redirect to dashboard
            }
          },
          error: (err) => {
            this.isLoading = false;  // Turn off loading
            if (err.status === 401) {
              this.errorMessage = 'Unauthorized: Incorrect email or password';
            } else if (err.status === 400) {
              this.errorMessage = 'Bad Request: Please check your input';
            } else if (err.status === 500) {
              this.errorMessage = 'Server error: Please try again later';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again.';
            }
            console.error('Login error:', err);
          }
        });
    } else {
      this.errorMessage = 'Please fill in both email and password';
    }
  }
}
