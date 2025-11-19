import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SignIn } from '../sign-in/sign-in.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

   auth = inject(AuthService);
   signInService = inject(SignIn)
   loggedIn = computed(() => this.signInService.loggedIn()) 

   private router = inject(Router);

   homeClick(){
    this.router.navigate(['/home']);
   }
   guessClick(){
    this.router.navigate(['/guesses'])
   }
   standingsClick(){
    this.router.navigate(['/standings'])
   }
   usersClick(){
    this.router.navigate(['/users'])
   }
   leagueStandingsClick(){
    this.router.navigate(['/league-standings'])
   }
     signinClick() {
    this.router.navigate(['/sign-in'])
    
  }
  signupClick(){
    this.router.navigate(['/sign-up'])
  }

  signoutClick() {
    this.router.navigate(['/sign-out'])
   
  }
  dashboardClick(){
    this.router.navigate(['/dashboard'])
  }


  
  constructor() { }


  ngOnInit() {
  }

}
