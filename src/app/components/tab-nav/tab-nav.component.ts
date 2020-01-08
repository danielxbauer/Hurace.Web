import { Component, OnInit, Input } from '@angular/core';
import { NavLink } from 'src/app/models/nav-link.model';

@Component({
    selector: 'app-tab-nav',
    templateUrl: './tab-nav.component.html',
    styleUrls: ['./tab-nav.component.scss']
})
export class TabNavComponent implements OnInit {
    @Input() public links: NavLink[] = [];

    constructor() { }

    ngOnInit() {
    }

}
