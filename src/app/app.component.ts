import { Component, OnInit } from '@angular/core';

interface NavLink {
    path: string,
    label: string
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public navLinks: NavLink[] = [
        { path: '/skiers', label: 'Skiers' },
        { path: '/live', label: 'Live View' }
    ];
}
