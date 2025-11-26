import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
// import mapSvg from './map.svg';
@Component({
  selector: 'app-map',

  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  svgContent: SafeHtml = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadSvg();
  }

  loadSvg(): void {
    this.http
      .get('/assets/world_Map.svg', { responseType: 'text' })
      .subscribe((svg) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }
}
