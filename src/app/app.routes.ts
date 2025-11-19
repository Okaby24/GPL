import { Route } from '@angular/router';
import { HomeComponent } from './modules/admin/home/home.component';
import { GuessesComponent } from './modules/admin/guesses/guesses.component';
import { StandingsComponent } from './modules/admin/standings/standings.component';
import { UsersComponent } from './modules/admin/users/users.component';
import { LeagueStandingsComponent } from './modules/admin/league-standings/league-standings.component';
import { SignInComponent } from './modules/admin/sign-in/sign-in.component';
import { SignOutComponent } from './modules/admin/sign-out/sign-out.component';
import { SignUpComponent } from './modules/admin/sign-up/sign-up.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { FeedsComponent } from './modules/admin/feeds/feeds.component';
import { ProfileComponent } from './modules/admin/profile/profile.component';
import { MerchantsDasahboardComponent } from './modules/admin/merchantsDasahboard/merchantsDasahboard.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'home'},

    // Admin routes
    {
        path: '',
        data:{
            layout:'empty'
        },
       // component: LayoutShellComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {
                path: 'guesses' , component: GuessesComponent
            },
            {
                path: 'standings' , component: StandingsComponent
            },
            {
                path: 'users' , component: UsersComponent
            },{
                path:'league-standings', component:LeagueStandingsComponent
            },
            {
                path: 'sign-in' , component: SignInComponent
            },
            {
                path: 'sign-out' , component: SignOutComponent
            },
            {
                path: 'sign-up' , component: SignUpComponent
            },
            {
                path: 'dashboard',component: DashboardComponent
            },
            {
                path: 'feeds', component: FeedsComponent
            },
            {
                path: 'profile/:author',component: ProfileComponent
            },
            {
                path: 'merchantsDashboard' , component: MerchantsDasahboardComponent
            }
        ]
    }
];
