import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter, HostBinding, HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'app-rating-picker',
  templateUrl: './rating-picker.component.html',
  styleUrls: ['./rating-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingPickerComponent,
      multi: true,
    },
  ]
})
export class RatingPickerComponent implements OnChanges, ControlValueAccessor {
  @Input()
  disabled = false;

  @Input()
  value: RatingOptions = null;

  @Output()
  changed = new EventEmitter<RatingOptions>();

  @Input()
  @HostBinding('attr.tabIndex')
  tabIndex = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  @HostListener('blur')
  onBlur() {
    this.onTouch();
  }

  onChange!: (newValue: RatingOptions) => void;
  onTouch!: () => void;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['value']) {
      return;
    }

    if (changes['value']) {
      this.onChange(changes['value'].currentValue);
    }
  }

  writeValue(obj: RatingOptions): void {
    this.value = obj;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  setValue(rating: RatingOptions): void {
    if (!this.disabled) {
      this.value = rating;
      this.onChange(this.value);
      this.onTouch();
      this.changed.emit(this.value);
    }
  }
}
