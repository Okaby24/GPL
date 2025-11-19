import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TranslocoService } from '@jsverse/transloco';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Custom validator to check password match
export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const pass = formGroup.get(password)?.value;
    const confirmPass = formGroup.get(confirmPassword)?.value;
    if (pass !== confirmPass) {
      formGroup.get(confirmPassword)?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [    CommonModule,
    ReactiveFormsModule ]
})
export class SignUpComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
   private notification = inject(NzNotificationService);


  // reactive form
 formGroup = signal<FormGroup>(
    this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(3)]],
        confirmPassword: ['', [Validators.required]]
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword') 
      }
    )
  );

  constructor() {}

  ngOnInit() {}

  // Navigate to sign-in
  signIn() {
    this.router.navigate(['/sign-in']);
  }



  // Handle sign-up submission
signUp() {
  if (this.formGroup().valid) {
    const formData = this.formGroup().value;
    console.log('Form Data:', formData);

    this.notification.success(
      'Signup Success ✅',
      'Your account has been created successfully!'
    );

    this.router.navigate(['/sign-in']);
  } else {
    // Gather all errors
    const errors: string[] = [];

    const controls = this.formGroup().controls;
    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control.errors) {
        Object.keys(control.errors).forEach(errorKey => {
          if (errorKey === 'required') {
            errors.push(`${key} is required`);
          }
          if (errorKey === 'email') {
            errors.push(`Invalid email format`);
          }
          if (errorKey === 'minlength' && control.errors) {
            errors.push(`${key} must be at least ${control.errors['minlength'].requiredLength} characters`);
          }
          if (errorKey === 'maxlength' && control.errors) {
            errors.push(`${key} must be at most ${control.errors['maxlength'].requiredLength} characters`);
          }
          if (errorKey === 'mismatch') {
            errors.push(`Passwords do not match`);
          }
        });
      }
    });

    // Log form data anyway
    console.log('Form is invalid:', this.formGroup().value);

    // Show notification with all errors
    this.notification.error(
      'Signup Failed ❌',
      errors.length > 0 ? `${errors.join(', ')} , Please Try Again` : 'Please fix the errors and try again.'
    );
  }
}

}
