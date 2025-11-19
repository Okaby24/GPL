import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Router } from '@angular/router';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './league-standings.component.html',
  styleUrls: ['./league-standings.component.css']
})
export class LeagueStandingsComponent implements OnInit {
  http = inject(HttpClient);
  private router = inject(Router);

  standings: any[] = [];
  loading = true;
  error: string | null = null;

  columnDefs = [
    { headerName: 'Ranking', field: 'position', flex: 1, valueGetter: 'node.rowIndex + 1' },
    { headerName: 'Team', field: 'team', flex: 3, cellRenderer: this.teamCellRenderer },
    { headerName: 'Points', field: 'points', flex: 2 },
    { headerName: 'Wins', field: 'wins', flex: 2 },
    { headerName: 'Draws', field: 'draws', flex: 2 },
    { headerName: 'Losses', field: 'losses', flex: 2 },
    { headerName: 'GF', field: 'goalsFor', flex: 2 },
    { headerName: 'GA', field: 'goalsAgainst', flex: 2 },
    { headerName: 'GD', field: 'goalDifference', flex: 2 },
  ];

  rowData: any[] = [];

  homeClick() {
    this.router.navigate(['/home']);
  }

  //API Fetch
  getLeagueTable() {
    const url = 'https://english-premiere-league1.p.rapidapi.com/tables?season=2025';
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
        localStorage.setItem('lastFetchDate', new Date().toDateString());
        localStorage.setItem('standingsData', JSON.stringify(this.rowData));
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load standings.';
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    
    const today = new Date();
    const day = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const allowedDays = [0, 1,  5, 6]; // Sun, Mon, Fri, Sat

    const lastFetchDate = localStorage.getItem('lastFetchDate');
    const cachedData = localStorage.getItem('standingsData');
    const todayString = today.toDateString(); 

    if (allowedDays.includes(day) && lastFetchDate !== todayString) {
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
