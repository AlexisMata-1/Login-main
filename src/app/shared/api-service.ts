import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http';
import {LoginI} from '../Interfaces/LoginI'
import { Observable } from 'rxjs';
import {ResponseI} from '../Interfaces/responseI'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="http://localhost:4000";

  constructor( private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion=this.apiUrl+'/Login';
return this.http.post<ResponseI>(direccion, form);
  }


}
