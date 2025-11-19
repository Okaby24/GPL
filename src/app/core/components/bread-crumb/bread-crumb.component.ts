import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
export interface Breadcrumb {
  label: string;
  url?: string;
}
@Component({
  selector: 'bread-crumb',
  imports:[CommonModule,RouterModule,TranslocoModule],
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  @Input() breadcrumbs: Breadcrumb[] = [];
  constructor() { }

  ngOnInit() {
  }

}
