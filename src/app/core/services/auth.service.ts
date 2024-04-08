import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { User } from '../../modules/dashboard/pages/users/interface';
import { UserLoginData } from '../../modules/dashboard/pages/users/interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authLoginUser: User | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }
  generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  signUp(newUser: User) {
    return this.http.post<User>(`${environment.apiUrl}/users`, { ...newUser, role: 'Cust', created_at: new Date(), token: this.generateRandomString(15) });
  }

  private setAuthLoginUser(user: User) {
    this.authLoginUser = user;
    localStorage.setItem('userData', JSON.stringify(user));
  }

  login(data: UserLoginData) {
    return this.http.get<User[]>(`${environment.apiUrl}/users?email=${data.email}&password=${data.password}`).pipe(
      tap((response) => {
        if (!!response[0]) {
          this.setAuthLoginUser(response[0]);
        } else {
          alert('Credenciales incorrectas');
        }
      })
    )

  }

  isLoggedIn(): boolean {
    return localStorage.getItem('userData') !== null;
  }

 getLoggedInUser(): Array<User> | void {
    this.authLoginUser = JSON.parse(localStorage.getItem('userData') || '{}');
  }
  logout() {
    localStorage.removeItem('userData');
    this.authLoginUser = null;
    this.router.navigate(['dashboard', 'home']);
  }

}