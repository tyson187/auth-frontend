import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';


export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [guestGuard],
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./features/auth/login/login.component')
                        .then(m => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./features/auth/register/register.component')
                        .then(m => m.RegisterComponent)
            },
            {
                path: 'forgot-password',
                loadComponent: () =>
                    import('./features/auth/forgot-password/forgot-password.component')
                        .then(m => m.ForgotPasswordComponent)
            },
        ]
    },
    {
        path: 'reset-password',
        canActivate: [guestGuard],
        loadComponent: () =>
            import('./features/auth/reset-password/reset-password.component')
                .then(m => m.ResetPasswordComponent)
    },
    {
        path: 'verify-email',
        loadComponent: () =>
            import('./features/auth/verify-email/verify-email.component')
                .then(m => m.VerifyEmailComponent)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./features/dashboard/dashboard.component')
                .then(m => m.DashboardComponent)
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
