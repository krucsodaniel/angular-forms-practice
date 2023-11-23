import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateFormsPageComponent } from './components';
import { BanWordsDirective, PasswordShouldMatchDirective } from './directives';
import { UniqueNicknameDirective } from './directives/unique-nickname.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [
    TemplateFormsPageComponent,
    BanWordsDirective,
    PasswordShouldMatchDirective,
    UniqueNicknameDirective,
  ],
  exports: [
    TemplateFormsPageComponent,
  ]
})
export class TemplateDrivenFormsModule {}
