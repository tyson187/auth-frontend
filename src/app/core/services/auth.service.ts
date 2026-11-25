import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';


// Interfaces matching backend DTOs
export interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: string;
}


export interface LoginRequest {
    email: string;
    password: string;
}


export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    age?: number;
}


export interface AuthResponse {
    token: string;
    user: User;
}


export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private apiUrl = environment.apiUrl;


    // === SIGNALS (Reactive State) ===
    private currentUserSignal = signal<User | null>(this.getStoredUser());
    private tokenSignal = signal<string | null>(this.getStoredToken());
    private loadingSignal = signal<boolean>(false);
    private errorSignal = signal<string | null>(null);


    // === COMPUTED SIGNALS (Derived State) ===
    isLoggedIn = computed(() => !!this.tokenSignal() && !!this.currentUserSignal());
    currentUser = computed(() => this.currentUserSignal());
    currentToken = computed(() => this.tokenSignal());
    isLoading = computed(() => this.loadingSignal());
    error = computed(() => this.errorSignal());


    // === METHODS ===


    login(credentials: LoginRequest): Observable<AuthResponse> {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);


        return this.http.post<ApiResponse<AuthResponse>>(
            `${this.apiUrl}/auth/login`,
            credentials
        ).pipe(
            tap({
                next: (response) => {
                    if (response.success && response.data) {
                        this.handleLoginSuccess(response.data);
                    }
                },
                error: (error) => {
                    this.loadingSignal.set(false);
                    this.errorSignal.set(
                        error.error?.error?.message || 'Login failed'
                    );
                }
            }),
            map(response => {
                this.loadingSignal.set(false);
                return response.data!;
            })
        );
    }


    register(data: RegisterRequest): Observable<{ message: string }> {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);


        return this.http.post<ApiResponse<{ message: string; userId: number }>>(
            `${this.apiUrl}/auth/register`,
            data
        ).pipe(
            tap({
                error: (error) => {
                    this.loadingSignal.set(false);
                    this.errorSignal.set(
                        error.error?.error?.message || 'Registration failed'
                    );
                }
            }),
            map(response => {
                this.loadingSignal.set(false);
                return { message: response.data?.message || 'Registration successful' };
            })
        );
    }


    verifyEmail(token: string): Observable<{ message: string }> {
        return this.http.get<ApiResponse<null>>(
            `${this.apiUrl}/auth/verify-email?token=${token}`
        ).pipe(
            map(response => ({
                message: response.message || 'Email verified successfully'
            }))
        );
    }


    forgotPassword(email: string): Observable<{ message: string }> {
        return this.http.post<ApiResponse<null>>(
            `${this.apiUrl}/auth/forgot-password`,
            { email }
        ).pipe(
            map(response => ({
                message: response.message || 'Reset link sent'
            }))
        );
    }


    resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
        return this.http.post<ApiResponse<null>>(
            `${this.apiUrl}/auth/reset-password`,
            { token, newPassword }
        ).pipe(
            map(response => ({
                message: response.message || 'Password reset successful'
            }))
        );
    }


    getCurrentUser(): Observable<User> {
        return this.http.get<ApiResponse<User>>(`${this.apiUrl}/auth/me`).pipe(
            map(response => response.data!)
        );
    }


    logout(): void {
        this.currentUserSignal.set(null);
        this.tokenSignal.set(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
        this.router.navigate(['/auth/login']);
    }


    clearError(): void {
        this.errorSignal.set(null);
    }


    // === PRIVATE HELPERS ===


    private handleLoginSuccess(authData: AuthResponse): void {
        this.tokenSignal.set(authData.token);
        this.currentUserSignal.set(authData.user);
        localStorage.setItem('auth_token', authData.token);
        localStorage.setItem('current_user', JSON.stringify(authData.user));
    }


    private getStoredToken(): string | null {
        return localStorage.getItem('auth_token');
    }


    private getStoredUser(): User | null {
        const stored = localStorage.getItem('current_user');
        return stored ? JSON.parse(stored) : null;
    }
}
