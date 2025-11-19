import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // reactive boolean to track authentication
  isAuthenticated = signal(false);

  signIn() {
    this.isAuthenticated.set(true);
  }

  signOut() {
    this.isAuthenticated.set(false);
  }
}
