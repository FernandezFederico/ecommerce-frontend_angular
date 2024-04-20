import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationErrors'
})
export class ValidationErrorsPipe implements PipeTransform {

  transform(error?: ValidationErrors | null, ...args: unknown[]): unknown {

    if (!!error) {
      let errorMessages = [];

      if (error['required']) {
        errorMessages.push('Este campo es requerido');
      }
      if (error['email']) {
        errorMessages.push('Este campo debe ser un email');
      }
      if (error['minlength']) {
        errorMessages.push(`Este campo debe tener al menos ${error['minlength']['requiredLength']} caracteres`);
      }
      if (error['maxlength']) {
        errorMessages.push(`Este campo debe tener como máximo ${error['maxlength']['requiredLength']} caracteres`);
      }
      if (error['pattern']) {
        errorMessages.push('Este campo debe ser valido');
      }
      return errorMessages.join(', ') + '.';
    }
    return null;
  }

}
