import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkierListComponent } from './components/skier-list/skier-list.component';
import { SkierEditComponent } from './components/skier-edit/skier-edit.component';
import { NothingSelectedComponent } from './components/nothing-selected/nothing-selected.component';
import { RaceListComponent } from './components/race-list/race-list.component';
import { RaceDetailComponent } from './components/race-detail/race-detail.component';
import { SeasonComponent } from './components/season/season.component';

const routes: Routes = [
    { path: '', redirectTo: 'skiers', pathMatch: 'full' },
    { path: 'skiers', component: SkierListComponent, children: [
        { path: ':id', component: SkierEditComponent },
        { path: '**', component: NothingSelectedComponent }
    ] },
    { path: 'races', component: RaceListComponent, children: [
        { path: ':id', component: RaceDetailComponent },
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
