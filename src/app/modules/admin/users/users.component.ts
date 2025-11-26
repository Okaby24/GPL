import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { RollingComponent } from "./rolling/rolling.component";
import { MapComponent } from "./map/map.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [AgGridModule, RollingComponent, MapComponent]
})
export class UsersComponent implements OnInit{
  // Column definitions
  colDefs: ColDef[] = [
    { headerName: '#', field: 'id', width: 90 },
    { headerName: 'Username', field: 'username', flex: 1 },
    { headerName: 'Email', field: 'email', flex: 1.5 },
    { headerName: 'Role', field: 'role', flex: 1 },
    {
      headerName: 'Status',
      field: 'status',
      flex: 1,
      cellRenderer: (params: any) => {
        const status = params.value;
        let colorClass = 'bg-gray-200 text-gray-700';
        if (status === 'Active') colorClass = 'bg-green-100 text-green-700';
        if (status === 'Pending') colorClass = 'bg-yellow-100 text-yellow-700';
        if (status === 'Banned') colorClass = 'bg-red-100 text-red-700';

        return `<span class="px-3 py-1 text-xs font-semibold rounded-full ${colorClass}">${status}</span>`;
      }
    },
    {
      headerName: 'Actions',
      field: 'actions',
      flex: 1,
      cellRenderer: () => {
        return `
          <div class="space-x-2">
            <button class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">Edit</button>
            <button class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition">Delete</button>
          </div>
        `;
      }
    }
  ];

  // Example row data
  rowData = [
    { id: 1, username: 'FantasyKing', email: 'king@example.com', role: 'Admin', status: 'Active' },
    { id: 2, username: 'DreamPlayer', email: 'dream@example.com', role: 'User', status: 'Pending' },
    { id: 3, username: 'Legend23', email: 'legend@example.com', role: 'User', status: 'Banned' }
  ];

  constructor(){
    
  }

  ngOnInit(){
    
  }
}
