import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewWriterComponent, RatingPickerComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { EditableContentValueAccessor } from './directives';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReviewWriterComponent,
    EditableContentValueAccessor,
    RatingPickerComponent,
  ],
  exports: [
    ReviewWriterComponent,
  ]
})
export class ControlValueAccessorModule {}
