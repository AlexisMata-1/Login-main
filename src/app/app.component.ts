import { Component } from '@angular/core';
import { localStorageService } from './shared/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Registros de Desayunos';

constructor(private localS:localStorageService){

}


 usuario = JSON.parse(this.localS.getLoc('usuario'))

isActive(){
  if(this.usuario!=null){
    return true
  }
}


isLogout(){
  if (this.usuario==null){
    return true
  }
}


LogOut(){
  this.localS.clear();
}

}
