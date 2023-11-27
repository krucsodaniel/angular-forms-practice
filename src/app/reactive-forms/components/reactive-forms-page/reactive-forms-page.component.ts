import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormRecord,
  Validators
} from '@angular/forms';
import { UniqueNicknameValidatorService, UserSkillsService } from '../../services';
import { bufferCount, filter, Observable, startWith, Subscription, tap } from 'rxjs';
import { banWords, passwordMustMatch } from '../../validators';

@Component({
  selector: 'app-reactive-forms-page',
  templateUrl: './reactive-forms-page.component.html',
  styleUrls: ['./reactive-forms-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsPageComponent implements OnInit, OnDestroy {
  phoneLabels = ['Main', 'Mobile', 'Work', 'Home'];
  skills$!: Observable<string[]>;

  // myForm = new FormGroup({
  //   firstName: new FormControl('Initial name'),
  //   lastName: new FormControl('Initial name'),
  //   nickName: new FormControl('Initial name'),
  //   email: new FormControl('Initial email'),
  //   yearOfBirth: new FormControl(2000),
  //   passport: new FormControl(''),
  //   address: new FormGroup({
  //     fullAddress: new FormControl(''),
  //     city: new FormControl(''),
  //     postCode: new FormControl(0),
  //   }),
  //   phones: new FormArray([
  //     new FormGroup({
  //       label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
  //       phone: new FormControl(''),
  //     })
  //   ]),
  //   // skills: new FormGroup<{ [key: string]: FormControl<boolean> }>({}), same as below
  //   skills: new FormRecord<FormControl<boolean>>({}),
  // });

  myForm = this.fb.group({
    firstName: ['Initial name',
      [
        Validators.required,
        Validators.minLength(2),
        banWords(['test', 'admin', 'dummy']),
      ]
    ],
    lastName: ['Initial name',
      [
        Validators.required,
        Validators.minLength(2),
        banWords(['test', 'admin', 'dummy']),
      ],
    ],
    nickName: ['Initial name',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
          banWords(['test', 'admin', 'dummy']),
        ],
        asyncValidators: [this.uniqueNicknameValidatorService.validate.bind(this.uniqueNicknameValidatorService)],
        updateOn: 'blur',
      },
    ],
    email: ['Initial email', [Validators.required, Validators.email]],
    yearOfBirth: this.fb.nonNullable.control(2000, [Validators.required]),
    passport: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)]],
    address: this.fb.group({
      fullAddress: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postCode: [0, [Validators.required]],
    }),
    phones: this.fb.array([
      this.fb.group({
        label: this.fb.nonNullable.control(this.phoneLabels[0]),
        phone: '',
      })
    ]),
    // skills: new FormGroup<{ [key: string]: FormControl<boolean> }>({}), same as below
    // skills: new FormRecord<FormControl<boolean>>({}),
    skills: this.fb.record<boolean>({}),
    password: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: '',
      },
      { validators: passwordMustMatch }),
  });

  private ageValidators!: Subscription;
  private formPendingState!: Subscription;
  private initialFormValues: any;

  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
  }

  constructor(
    private userSkillsService: UserSkillsService,
    private fb: FormBuilder,
    private uniqueNicknameValidatorService: UniqueNicknameValidatorService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.skills$ = this.userSkillsService.getSkills()
      .pipe(
        tap((skills) => this.buildSkillsControls(skills)),
        tap(() => this.initialFormValues = this.myForm.value),
      );

    this.ageValidators = this.myForm.controls.yearOfBirth.valueChanges
      .pipe(
        tap(() => this.myForm.controls.passport.markAsDirty()),
        startWith(this.myForm.controls.yearOfBirth.value),
      )
      .subscribe((yearOfBirth: number) => {
        this.isAdult(yearOfBirth)
          ? this.myForm.controls.passport.addValidators(Validators.required)
          : this.myForm.controls.passport.removeValidators(Validators.required);
        this.myForm.controls.passport.updateValueAndValidity();
      });

    this.formPendingState = this.myForm.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([previousState]) => previousState === 'PENDING')
      )
      .subscribe(() => this.cdr.markForCheck())
  }

  ngOnDestroy(): void {
    this.ageValidators.unsubscribe();
    this.formPendingState.unsubscribe();
  }

  addPhone(): void {
    this.myForm.controls.phones.push(
      new FormGroup({
        label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
        phone: new FormControl(''),
      })
    );
  }

  removePhone(index: number): void {
    this.myForm.controls.phones.removeAt(index);
  }

  onSubmit($event: any): void {
    console.log(this.myForm);
    this.initialFormValues = this.myForm.value;
    this.formDir.resetForm(this.myForm.value);
  }

  onReset(event: Event): void {
    event.preventDefault();
    this.formDir.resetForm(this.initialFormValues);
  }

  private buildSkillsControls(skills: string[]) {
    skills.forEach((skill: string) => {
      this.myForm.controls.skills.addControl(skill, new FormControl(false, { nonNullable: true }));
    });
  }

  private isAdult(yearOfBirth: number): boolean {
    const currentYear = new Date().getFullYear();
    return currentYear - yearOfBirth >= 18;
  }
}
