import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { User } from '../../modules/dashboard/pages/users/interface';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }
}
