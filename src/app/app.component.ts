import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./modules/admin/sidebar/sidebar.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, SidebarComponent]
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor() {
        console.log('AppComponent initialized in mfe2');
    }
}
