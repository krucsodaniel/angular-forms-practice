import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appBanWords]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: BanWordsDirective,
      multi: true,
    },
  ],
})
export class BanWordsDirective implements Validator {
  @Input()
  set appBanWords(value: string | string[]) {
    this.bannedWords = Array.isArray(value) ? value : [value];
    this.onChange();
  }

  private bannedWords: string[] = [];
  private onChange: () => void = () => {}; // assigning default empty object

  validate(control: AbstractControl<string>): ValidationErrors | null {
    const foundBannedWord = this.bannedWords.find((word: string) => word.toLowerCase() === control.value?.toLowerCase());

    return !foundBannedWord
      ? null
      : { appBanWords: { bannedWord: foundBannedWord } };
  }

  registerOnValidatorChange(fn: () => void) {
    this.onChange = fn;
  }

}
