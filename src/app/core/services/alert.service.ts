import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private notification$ = new Subject<SweetAlertOptions>();
  constructor() {
    this.notification$.subscribe({
      next: (options) => {
        Swal.fire(options);
      },
    });
  }

  showSuccessAlert(message: string) {
    this.notification$.next({
      icon: 'success',
      title: 'Éxito',
      text: message,
    });
  }
  showErrorAlert(message: string) {
    this.notification$.next({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  showDeleteConfirmation(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
      }).then((result: SweetAlertResult) => {
        resolve(result.isConfirmed);
      });
    });
  }
}
