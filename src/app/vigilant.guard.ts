import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { localStorageService } from './shared/localstorage.service';


@Injectable({
  providedIn: 'root'
})
export class VigilantGuard implements CanActivate {

  constructor(private router: Router, private localS: localStorageService) {

  }



  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //VALIDACION DE SI EL USUARIO ES ADMINISTRADOR
    const usuarioLog = JSON.parse(this.localS.getLoc('usuario'))
      
    if (usuarioLog.id_user_type == 3 ) {

      this.router.navigate(['/', 'calendar'])

      return false

    } else {

      return true;

    }

  }



}
