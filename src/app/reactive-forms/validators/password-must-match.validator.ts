import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMustMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  const error = { passwordMustMatch: { match: false } };

  if (password?.value === confirmPassword?.value) {
    return null;
  }

  confirmPassword?.setErrors(error);

  return error;
}
