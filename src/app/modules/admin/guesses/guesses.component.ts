import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-guesses',
  templateUrl: './guesses.component.html',
  styleUrls: ['./guesses.component.css'],
  imports: [AgGridModule , CommonModule, FormsModule]
})
export class GuessesComponent implements OnInit {

    http = inject(HttpClient);
  private router = inject(Router);

  standings: any[] = [];
  loading = true;
  error: string | null = null;
    rowData: any[] = [];

  teams = [
  'Arsenal', 'Chelsea',
  'Liverpool', 'Man City',
  'Man United', 'Tottenham',
  'Newcastle', 'Aston Villa',
  'Brighton', 'West Ham',
  'Crystal Palace', 'Wolves',
  'Everton', 'Nottingham Forest',
  'Fulham', 'Brentford',
  'Bournemouth', 'Southampton',
  'Leeds United', 'Leicester City'
];

matches = this.teams.reduce((acc: { home: string; away: string }[], team, i, arr) => {
  if (i % 2 === 0 && arr[i + 1]) {
    acc.push({ home: team, away: arr[i + 1] });
  }
  return acc;
}, []);



  onSave(){
    console.log('Guesses Submitted')
  }

  constructor() { }
getLeagueTable() {
    const url = 'https://english-premiere-league1.p.rapidapi.com/schedule?year=2025';
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'english-premiere-league1.p.rapidapi.com',
      'x-rapidapi-key': '6317288f7dmsh0c01414116b0262p10b2d5jsnbe257b1f9257'
    });

    this.http.get<any>(url, { headers }).subscribe({
      next: (data) => {
        const entries = data.children[0].standings.entries;

        this.rowData = entries.map((entry: any) => {
          const stats = entry.stats.reduce((acc: any, s: any) => {
            acc[s.name] = s.value;
            return acc;
          }, {});
          return {
            team: entry.team.displayName,
            logo: entry.team.logos?.[0]?.href,
            points: stats.points,
            wins: stats.wins,
            losses: stats.losses,
            draws: stats.ties,
            goalsFor: stats.pointsFor,
            goalsAgainst: stats.pointsAgainst,
            goalDifference: stats.pointDifferential
          };
        });

        this.loading = false;

        //Save data + fetch date
        localStorage.setItem('lastFetchDateSchedule', new Date().toDateString());
        localStorage.setItem('scheduleData', JSON.stringify(this.rowData));
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load schedule.';
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const allowedDays = [1]; // Sun, Mon, Fri, Sat

    const lastFetchDateSchedule = localStorage.getItem('lastFetchDateSchedule');
    const cachedData = localStorage.getItem('scheduleData');
    const todayString = today.toDateString(); 

    if (allowedDays.includes(day) && lastFetchDateSchedule !== todayString) {
     // Allowed day + not fetched yet today → call API
      this.getLeagueTable();
    } else if (cachedData) {
      // Load cached data instead
      this.rowData = JSON.parse(cachedData);
      this.loading = false;
    } else {
      // No cache + not allowed day → nothing to show
      this.loading = false;
    }
  }

  teamCellRenderer(params: any) {
    if (!params.data) return '';
    const logo = params.data.logo
      ? `<img src="${params.data.logo}" alt="${params.value}" width="20" height="20" style="margin-right:8px; vertical-align:middle"/>`
      : '';
    return `${logo}${params.value}`;
  }

}
