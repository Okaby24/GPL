import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignIn } from '../sign-in/sign-in.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  signInService = inject(SignIn)
  loggedIn = computed(() => this.signInService.loggedIn())

  confirmSignOut() {
    this.authService.signOut();
    this.signInService.loggedIn.set(false);
    this.router.navigate(['/sign-in']);
  }

  cancelSignOut() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
