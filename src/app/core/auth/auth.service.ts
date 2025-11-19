import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated: boolean = false;

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    sessionStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return sessionStorage.getItem('accessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('signedInUserData');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    // if (AuthUtils.isTokenExpired(this.accessToken)) {
    //     return of(false);
    // }

    // If the access token exists, and it didn't expire, sign in using it
    return of(true);
  }
}
