import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RatingOptions } from '../rating-picker/rating-picker.component';

interface Rating {
  reviewText: string,
  reviewRating: RatingOptions,
}

@Component({
  selector: 'app-review-writer',
  templateUrl: './review-writer.component.html',
  styleUrls: ['./review-writer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewWriterComponent {
  myForm = this.fb.group<Rating>({
    reviewText: '',
    reviewRating: null,
  })

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    console.log(this.myForm.value)
  }
}
