import { Component, OnInit, AfterViewInit, ElementRef, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from '../sign-in/sign-in.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  SignInService = inject(SignIn)

  private router = inject(Router);

  loggedIn = computed(() => this.SignInService.loggedIn()) 

  getStarted(){
    this.router.navigate(['/feeds'])
  }
  signUp(){
    this.router.navigate(['/sign-up'])
  }
  signOut(){
    this.router.navigate(['/sign-out'])
  }

  constructor(private el: ElementRef) {}

  ngOnInit() {}


}
