import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkierListComponent } from './components/skier-list/skier-list.component';
import { SkierEditComponent } from './components/skier-edit/skier-edit.component';
import { NothingSelectedComponent } from './components/nothing-selected/nothing-selected.component';
import { LiveListComponent } from './components/live-list/live-list.component';
import { LiveDetailComponent } from './components/live-detail/live-detail.component';
import { SeasonComponent } from './components/season/season.component';

const routes: Routes = [
    { path: '', redirectTo: 'skiers', pathMatch: 'full' },
    { path: 'skiers', component: SkierListComponent, children: [
        { path: ':id', component: SkierEditComponent },
        { path: '**', component: NothingSelectedComponent }
    ] },
    { path: 'live', component: LiveListComponent, children: [
        { path: ':id', component: LiveDetailComponent },
        { path: '**', component: NothingSelectedComponent }
    ] },
    { path: 'season', component: SeasonComponent },
    { path: '**', redirectTo: 'skiers' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
