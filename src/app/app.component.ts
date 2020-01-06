import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllCountries } from './actions';

interface NavLink {
    path: string,
    label: string
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public navLinks: NavLink[] = [
        { path: '/skiers', label: 'Skiers' },
        { path: '/live', label: 'Live View' }
    ];

    constructor(
        private store: Store
    ) {
        store.select(s => s)
         .subscribe(s => console.log(s));
    }

    ngOnInit() {
        this.store.dispatch(new GetAllCountries())
    }
}
