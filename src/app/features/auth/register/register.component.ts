import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);


    successMessage: string | null = null;


    registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)/)
        ]],
        confirmPassword: ['', Validators.required],
        age: [null, [Validators.min(13), Validators.max(120)]]
    });


    isLoading = this.authService.isLoading;
    error = this.authService.error;


    onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched();
            return;
        }


        const { name, email, password, confirmPassword, age } = this.registerForm.value;


        if (password !== confirmPassword) {
            this.authService['errorSignal'].set('Passwords do not match');
            return;
        }


        this.authService.register({ name: name!, email: email!, password: password!, age: age || undefined })
            .subscribe({
                next: (response) => {
                    this.successMessage = response.message;
                    this.registerForm.reset();
                },
                error: (error) => {
                    console.error('Registration failed:', error);
                }
            });
    }


    get f() {
        return this.registerForm.controls;
    }
}
