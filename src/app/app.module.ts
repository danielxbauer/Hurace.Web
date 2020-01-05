import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SkierListComponent } from './components/skier-list/skier-list.component';
import { LiveViewComponent } from './components/live-view/live-view.component';
import { SkierEditComponent } from './components/skier-edit/skier-edit.component';
import { NothingSelectedComponent } from './components/nothing-selected/nothing-selected.component';
import { LiveListComponent } from './components/live-list/live-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { SkierEffects } from './effects/skier.effects';
import { CountriesEffects } from './effects/countries.effects';
import { LiveEffects } from './effects/live.effects';

@NgModule({
    declarations: [
        AppComponent,
        SkierListComponent,
        LiveViewComponent,
        SkierEditComponent,
        NothingSelectedComponent,
        LiveListComponent // TODO: remove?
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatTabsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot([
            AppEffects,
            SkierEffects,
            CountriesEffects,
            LiveEffects
        ]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    ],
    providers: [
        MatNativeDateModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
