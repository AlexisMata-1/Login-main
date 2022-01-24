import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginI } from 'src/app/Interfaces/LoginI';
import { UserService } from '../../shared/api-service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { localStorageService } from 'src/app/shared/localstorage.service';
import { environment } from 'src/environments/environment';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  private userservices: UserService

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient,
    private router: Router,
    public cookie:CookieService,
    public localS:localStorageService
   ) {

    }
    
    ///////////instancia para llamar a la direccion de la API
    private apiUrl= environment.apiUrl;


  ngOnInit(): void {


  }

  onSubmit(form: LoginI) {

    console.log(form);

    try {


      this.http.post(this.apiUrl+'/Login', form).subscribe(res => {

        if (res == null) {

          console.log('Usuario o contraseña incorrectos')

        } else {

          this.localS.setLoc('usuario',JSON.stringify(res))
          console.log(JSON.parse(this.localS.getLoc('usuario')))

          this.router.navigate(['/calendar']);

        } 
      })

    } catch (error) {
      console.log(error)
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get pass() {
    return this.loginForm.get('pass');
  }
}
