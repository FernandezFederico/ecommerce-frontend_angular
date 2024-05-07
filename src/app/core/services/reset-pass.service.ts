import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResetPassService {
  showResetPassForm: boolean = false;

  constructor() {}

  toggleResetForms() {
    this.showResetPassForm = !this.showResetPassForm;
  }

  // TODO: se necesita el backend para que funcione
}
