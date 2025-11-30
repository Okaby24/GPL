import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  OnInit,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [CommonModule]
})
export class MapComponent implements OnInit {
  @ViewChild('svgWrapper', { static: true }) svgWrapper!: ElementRef;

  svgContent: any;

  selectedCountry = '';
  slectedCountryProjects = '';
  infoVisible = false;
  infoX = 0;
  infoY = 0;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.loadSvg();
  }

  loadSvg() {
    this.http
      .get('/assets/world_Map.svg', { responseType: 'text' })
      .subscribe((svg) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svg);

        setTimeout(() => this.attachEvents());
      });
  }

attachEvents() {
  const svg = this.svgWrapper.nativeElement.querySelector('svg');
  if (!svg) return;

  const groups = svg.querySelectorAll('g');

  groups.forEach((g: any) => {
    this.renderer.listen(g, 'mouseenter', (event: MouseEvent) => {
      
      const name = g.getAttribute('data-name');
      const description = g.getAttribute('data-description');


      if (!name || !description) {
        this.infoVisible = false;
        return;
      }


      this.selectedCountry = name;
      this.slectedCountryProjects = description;

      this.infoX = event.clientX + 15;
      this.infoY = event.clientY + 15;
      this.infoVisible = true;
    });

    this.renderer.listen(g, 'mousemove', (event: MouseEvent) => {
      if (!this.infoVisible) return;
      this.infoX = event.clientX  -100;
      this.infoY = event.clientY - 100;
    });

    this.renderer.listen(g, 'mouseleave', () => {
      this.infoVisible = false;
    });
  });
}

}
