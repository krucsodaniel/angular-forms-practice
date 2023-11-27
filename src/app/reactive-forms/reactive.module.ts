import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsPageComponent } from './components/reactive-forms-page/reactive-forms-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UniqueNicknameValidatorService, UserSkillsService } from './services';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ReactiveFormsPageComponent,
  ],
  providers: [
    UserSkillsService,
    UniqueNicknameValidatorService,
  ],
  exports: [
    ReactiveFormsPageComponent
  ]
})
export class ReactiveModule {}
