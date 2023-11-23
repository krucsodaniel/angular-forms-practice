import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TemplateDrivenFormsModule } from 'src/app/template-driven-forms/template-driven-forms.module';

@NgModule({
  imports: [
    BrowserModule,
    TemplateDrivenFormsModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
