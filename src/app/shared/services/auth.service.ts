declare var google: any;

import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  signOut() {
    // Prevent auto re-sign-in
    google.accounts.id.disableAutoSelect();

    // Clear session data
    sessionStorage.removeItem('loggedInUser');

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
