import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TemplateDrivenFormsModule } from 'src/app/template-driven-forms/template-driven-forms.module';
import { ReactiveModule } from './reactive-forms/reactive.module';
import { SearchbarComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorModule } from './control-value-accessor/control-value-accessor.module';

@NgModule({
  imports: [
    BrowserModule,
    TemplateDrivenFormsModule,
    ReactiveModule,
    ReactiveFormsModule,
    ControlValueAccessorModule,
  ],
  declarations: [
    AppComponent,
    SearchbarComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
