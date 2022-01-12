import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule} from 'primeng/fullcalendar';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ReportsComponent } from './components/reports/reports.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    CalendarComponent,
    ConfigurationComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxCaptchaModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
