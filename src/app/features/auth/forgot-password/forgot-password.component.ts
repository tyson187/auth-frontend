import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);


    successMessage: string | null = null;


    forgotForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
    });


    isLoading = this.authService.isLoading;
    error = this.authService.error;


    onSubmit(): void {
        if (this.forgotForm.invalid) {
            this.forgotForm.markAllAsTouched();
            return;
        }


        const { email } = this.forgotForm.value;


        this.authService.forgotPassword(email!).subscribe({
            next: (response) => {
                this.successMessage = response.message;
            },
            error: (error) => {
                console.error('Forgot password failed:', error);
            }
        });
    }


    get f() {
        return this.forgotForm.controls;
    }
}
