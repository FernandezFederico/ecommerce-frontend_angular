import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../modules/dashboard/pages/users/interface';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authLoginUser: User | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}
  signUp(newUser: User) {
    return this.http.post<User[]>(`${environment.apiUrl}/users`, {
      newUser,
      userRole: 'CUST',
    });
  }

  private setAuthLoginUser(user: User) {
    this.authLoginUser = user;
    localStorage.setItem('userData', JSON.stringify(user));
  }

  login(userEmail: string, userPassword: string): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}/users/login`, {
        userEmail,
        userPassword,
      })
      .pipe(
        tap({
          next: (user) => {
            this.setAuthLoginUser(user);
            this.router.navigate(['dashboard', 'home']);
          },
          error: (error) => {
            console.error('Error en el login:', error);
            this.alertService.showErrorAlert('Credenciales incorrectas');
          },
        })
      );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userData') !== null;
  }

  getLoggedInUser(): User | void {
    this.authLoginUser = JSON.parse(localStorage.getItem('userData') || '{}');
  }
  logout() {
    localStorage.removeItem('userData');
    this.authLoginUser = null;
    this.router.navigate(['dashboard', 'home']);
  }
}