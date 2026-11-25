import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    private authService = inject(AuthService);


    currentUser = this.authService.currentUser;
    isLoggedIn = this.authService.isLoggedIn;


    logout(): void {
        this.authService.logout();
    }
}
