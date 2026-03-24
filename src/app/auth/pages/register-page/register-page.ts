import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';
import { AuthAlert } from "@auth/shared/auth-alert/auth-alert";

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule, AuthAlert, CommonModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { fullName = '', email = '', password = '' } = this.registerForm.value;

    this.authService.register(email!, password!, fullName!).subscribe((isRegistered) => {
      if (isRegistered) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }
}
