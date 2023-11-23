import { ChangeDetectorRef, Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[appUniqueNickname]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: UniqueNicknameDirective, multi: true
    },
  ],
})
export class UniqueNicknameDirective implements AsyncValidator {
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  validate(control: AbstractControl<string>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.http.get<any[]>(`https://jsonplaceholder.typicode.com/users?username=${ control.value }`)
      .pipe(
        map((users) => {
          return users.length === 0
            ? null
            : { uniqueNameError: { isTaken: true } };
        }),
        catchError(() => of({ uniqueNameError: { isTaken: true } })),
        finalize(() => this.cdr.markForCheck())
      )
  }
}
