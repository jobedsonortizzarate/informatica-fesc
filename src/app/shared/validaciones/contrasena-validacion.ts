import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class PasswordValidation {
  static validPassword(isRequired: boolean = false): ValidatorFn {
    const MAYUSCULAS = /[A-Z]/;
    const DIGIT_REGEX = /[0-9]/;
    const SYMBOL_REGEX = /[_!@#$%*]/;
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return isRequired
          ? { invalidPassword: `La contraseña es requerida.` }
          : null;
      }
      if (!MAYUSCULAS.test(control.value)) {
        return {
          invalidPassword: `La contraseña requiere por lo menos una letra mayúscula.`,
        };
      }
      if (!SYMBOL_REGEX.test(control.value)) {
        return {
          invalidPassword: `La contraseña requiere por lo menos un caracter especial.`,
        };
      }
      if (!DIGIT_REGEX.test(control.value)) {
        return { invalidPassword: `La contraseña requiere mínimo un número.` };
      }
      if (control.value.length < 12) {
        return { invalidPassword: `La contraseña debe tener 12 caracteres` };
      }
      return null;
    };
  }

  static matchPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmPasswordValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
