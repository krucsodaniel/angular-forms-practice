import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { IUserInfo } from '../../models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-forms-page',
  templateUrl: './template-forms-page.component.html',
  styleUrls: ['./template-forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormsPageComponent implements AfterViewInit {
  userInfo: IUserInfo = {
    firstName: 'Daniel',
    lastName: 'Hey',
    nickName: 'Danny',
    email: 'dan.hey@yeah.com',
    yearOfBirth: 2022,
    passport: '',
    fullAddress: 'Straight street',
    city: '21',
    postCode: 2121,
    password: 'Password',
    confirmPassword: 'Password',
  }

  @ViewChild(NgForm)
  formDir!: NgForm;

  private initialFormValues: unknown;

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.initialFormValues = this.formDir?.value;
    })
  }

  get years(): number[] {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 80)).fill('').map((_, idx) => now - idx);
  }

  get isAdult(): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - this.userInfo.yearOfBirth >= 18;
  }

  onSubmitForm(): void {
    this.formDir.resetForm(this.formDir.value);
    this.initialFormValues = this.formDir.value;
  }

  onReset(event: Event): void {
    event.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }
}
