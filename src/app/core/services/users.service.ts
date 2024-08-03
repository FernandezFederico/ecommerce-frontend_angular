import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { User, userRole } from '../../modules/dashboard/pages/users/interface';
import { environment } from '../../../environments/environment.development';
import { catchError, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private alertService: AlertService) {}

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getAllRoles(){
    return this.http.get<userRole[]>(`${environment.apiUrl}/roles`).pipe(
      catchError((error)=>{
        this.alertService.showErrorAlert('Error al cargar las categorías');
        return of([]);
      })
    )
  }

  addUser(user: User){
    return this.http.post<User>(`${environment.apiUrl}/users/add`, user ).pipe(
      mergeMap(() => this.getUsers()),
      catchError((error)=> {
        this.alertService.showErrorAlert('Error al crear Usuario')
        return of([])
      })
    )
  }

  updateUser(userId: string | number, updatedUser: User) {
    return this.http.put<User>(`${environment.apiUrl}/users/${userId}`, updatedUser).pipe(
      mergeMap(() => this.getUsers()),
      catchError((error) => {
        this.alertService.showErrorAlert('Error al actualizar el usuario');
        return of([]);
      })
    )
  }

  deleteUser(id: string) {
    return this.http.delete<User>(`${environment.apiUrl}/users/${id}`).pipe(
      catchError((error) => {
        this.alertService.showErrorAlert('Error al borrar el usuario');
        return of([]);
      })
    );
  }



}
