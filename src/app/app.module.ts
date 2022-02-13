import {LOCALE_ID, NgModule } from '@angular/core';
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
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { localStorageService } from '.././app/shared/localstorage.service'

//IMPORTACION DE LOCALE PARA CAMBIAR AL ESPAÑOL LAS FECHAS DEL CALENDARIO
import localePy from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { MostraUserTypePipe } from './mostra-user-type.pipe';
import { MostrarIsActivePipe } from './mostrar-is-active.pipe';
import { MostrarConfirmedAssistPipe } from './mostrar-confirmed-assist.pipe';
registerLocaleData(localePy, 'es');
///////////////////////////////////////////////////////////////////////

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
    RegisterComponent,
    CalendarComponent,
    ConfigurationComponent,
    ReportsComponent,
    MostraUserTypePipe,
    MostrarIsActivePipe,
    MostrarConfirmedAssistPipe,
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
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,

    

  ],
  providers: [CookieService,
    localStorageService,
    //HACIENDO LA INYECCION PAERA CAMBIAR EL IDIOMA A ESPAÑOL
    { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
