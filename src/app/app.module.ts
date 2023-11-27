import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TemplateDrivenFormsModule } from 'src/app/template-driven-forms/template-driven-forms.module';
import { ReactiveModule } from './reactive-forms/reactive.module';
import { SearchbarComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    TemplateDrivenFormsModule,
    ReactiveModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    SearchbarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
