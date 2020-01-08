import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
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
import { MatTableModule } from '@angular/material/table';
import { SkierListComponent } from './components/skier-list/skier-list.component';
import { SkierEditComponent } from './components/skier-edit/skier-edit.component';
import { NothingSelectedComponent } from './components/nothing-selected/nothing-selected.component';
import { LiveListComponent } from './components/live-list/live-list.component';
import { LiveDetailComponent } from './components/live-detail/live-detail.component';
import { CountryState } from './states/country.state';
import { SkierState } from './states/skier.state';
import { RaceState } from './states/race.state';
import { SeasonComponent } from './components/season/season.component';
import { SeasonState } from './states/season.state';

@NgModule({
    declarations: [
        AppComponent,
        SkierListComponent,
        SkierEditComponent,
        NothingSelectedComponent,
        LiveListComponent,
        LiveDetailComponent,
        SeasonComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        // Material Components
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
        MatTableModule,

        // Ngxs
        NgxsModule.forRoot([
            CountryState,
            SkierState,
            RaceState,
            SeasonState
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot(),
    ],
    providers: [
        MatNativeDateModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
