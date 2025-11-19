import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.css'],
  imports: [CommonModule, MatIconModule],
})
export class TableActionsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  params: any;
  actions: string[] = [];

  agInit(params: any): void {
    this.params = params;
    this.actions = params.actions || [];
  }

  onActionClick(action: string): void {
    if (this.params.onActionClick) {
      this.params.onActionClick(action, this.params.data);
    }
  }
}
