import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { User } from '../../modules/dashboard/pages/users/interface';
import { Router } from '@angular/router';
import { tap } from 'rxjs';


interface UserLoginData {
  email: string;
  password: string;
}

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
  singUp(newUser: User) {
    return this.http.post<User>(`${environment.apiUrl}/users`, { ...newUser, role: 'Customer', created_at: new Date(), token: this.generateRandomString(15) });
  }

  private setAuthLoginUser(user: User) {
    this.authLoginUser = user;
    localStorage.setItem('token', user.token);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  login(data: UserLoginData) {
    return this.http.get<User[]>(`${environment.apiUrl}/users?email=${data.email}&password=${data.password}`).pipe(
      tap((response) => {
        if (!!response[0]) {
          this.setAuthLoginUser(response[0]);
          console.log('desde auth', response[0]);
          console.log('el usuario lo guardo en la variable', this.authLoginUser);
        } else {
          alert('Credenciales incorrectas');
        }
      })
    )

  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getLoggedInUser(): void {
    const userData = this.authLoginUser = JSON.parse(localStorage.getItem('userData') || '{}');
    this.authLoginUser = userData;
  }
  logout() {
    this.router.navigate(['dashboard', 'home']);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.authLoginUser = null;
  }

}
