import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkierListComponent } from './skier-list/skier-list.component';
import { LiveViewComponent } from './live-view/live-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'skiers', pathMatch: 'full' },
    { path: 'skiers', component: SkierListComponent },
    { path: 'live', component: LiveViewComponent },
    { path: '**', redirectTo: 'skiers' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
