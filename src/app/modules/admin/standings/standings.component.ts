import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { AllCommunityModule, ColDef, ModuleRegistry } from 'ag-grid-community';
import { Router } from '@angular/router';

ModuleRegistry.registerModules([ AllCommunityModule ]);

@Component({
  selector: 'app-standings',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {
  http = inject(HttpClient);
  private router = inject(Router);

   homeClick(){
    this.router.navigate(['/home']);
   }


    ngOnInit() {
 
  }

   colDefs: ColDef[] = [
    { headerName: "Rank", field: "rank", width: 100, sortable: true },
    { headerName: "Username", field: "username", flex: 1 },
    { headerName: "Correct Guesses", field: "correct", flex: 1, sortable: true },
    { headerName: "Wrong Guesses", field: "wrong", flex: 1, sortable: true },
    { headerName: "Total Points", field: "points", flex: 1, sortable: true },
    {
      headerName: "Trend",
      field: "trend",
      flex: 1,
      cellRenderer: (params: any) => {
        if (params.value === "up") {
          return `<span class="text-green-600 font-bold">▲ Rising</span>`;
        }
        if (params.value === "down") {
          return `<span class="text-red-600 font-bold">▼ Falling</span>`;
        }
        return `<span class="text-gray-500">– Stable</span>`;
      }
    }
  ];

  // Example row data (standings)
  rowData = [
    { rank: 1, username: "FantasyKing", correct: 20, wrong: 5, points: 60, trend: "up" },
    { rank: 2, username: "DreamPlayer", correct: 18, wrong: 7, points: 54, trend: "down" },
    { rank: 3, username: "Legend23", correct: 15, wrong: 10, points: 45, trend: "stable" },
    { rank: 4, username: "ProPredictor", correct: 12, wrong: 8, points: 36, trend: "up" }
  ];

  

}
