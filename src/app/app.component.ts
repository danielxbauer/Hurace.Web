import { Component } from '@angular/core';
import { NavLink } from './models/nav-link.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public navLinks: NavLink[] = [
        { path: '/skiers', label: 'Skiers' },
        { path: '/races', label: 'Races' },
        { path: '/season', label: 'Season' }
    ];
}
