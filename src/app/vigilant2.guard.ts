import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { localStorageService } from './shared/localstorage.service';

@Injectable({
  providedIn: 'root'
})


export class Vigilant2Guard implements CanActivate {
  
constructor(private router: Router, private localS: localStorageService) {
}




  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    
    //VALIDACION DE SI EXISTE INFORMACION EN EL LOCAL STORAGE
     const usuarioLog = JSON.parse(this.localS.getLoc('usuario'))
     if(usuarioLog==null){

      this.router.navigate(['/', 'login'])
      return false
     }else{

            return true;

     }

    
 
 
  }
  
}
