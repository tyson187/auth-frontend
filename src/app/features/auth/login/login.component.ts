import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);


    private returnUrl = '/dashboard';


    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
    });


    isLoading = this.authService.isLoading;
    error = this.authService.error;


    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    }


    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }


        const { email, password } = this.loginForm.value;

        this.authService.login({ email: email!, password: password! }).subscribe({
            next: () => {
                this.router.navigateByUrl(this.returnUrl);
            },
            error: (error) => {
                console.error('Login failed:', error);
            }
        });
    }


    get f() {
        return this.loginForm.controls;
    }
}
