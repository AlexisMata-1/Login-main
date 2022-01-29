import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportsComponent } from './components/reports/reports.component';
import { VigilantGuard } from './vigilant.guard';
import { Vigilant2Guard } from './vigilant2.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
    },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [Vigilant2Guard ,VigilantGuard ]
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
    canActivate: [Vigilant2Guard ,VigilantGuard ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
