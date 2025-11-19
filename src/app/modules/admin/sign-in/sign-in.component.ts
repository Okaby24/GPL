import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignIn } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {




SignInService = inject(SignIn)
  private router = inject(Router);
  loggedIn = computed(() => this.SignInService.loggedIn())

     signIn() {
    // Here you can add actual validation
    this.authService.signIn();
    this.router.navigate(['/home']);
    this.SignInService.loggedIn.set(true)
  }

  signUp(){
    this.router.navigate(['/sign-up'])
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
