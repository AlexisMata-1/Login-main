import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginI } from 'src/app/Interfaces/LoginI';
import { UserService } from '../../shared/api-service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { localStorageService } from 'src/app/shared/localstorage.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  domains: any = []
  domainsValid: any = []

  private userservices: UserService

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient,
    private router: Router,
    public cookie: CookieService,
    public localS: localStorageService
  ) {

  }

  ///////////instancia para llamar a la direccion de la API
  private apiUrl = environment.apiUrl;


  ngOnInit(): void {

    this.http.get(this.apiUrl + '/Domain').subscribe(res => {
      this.domains = res
      console.log(this.domains)

    })

  }

  onSubmit(form: LoginI) {
    let dominioValido
    let domain
    let i = 0


    try {

      //hacemos una peticion con el correo y contraseña para saber si coinciden en la base de datos
      this.http.post(this.apiUrl + '/Login', form).subscribe(res => {
        //si no coincide diremos al usuarios lo siguiente
        if (res == null) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos',
          })
          //pero si coincide, tedremos que validar los siguientes aspectos
        } else {
          //mandamos una petición al back donde descubriremos si el usuario está activo o no
          this.http.post(this.apiUrl + '/Logins', form).subscribe(res => {
            //si el usuario cuenta con contraseña y correo correctos pero no está activo mandaremos el siguiente mensaje
            if (res != null) {

              Swal.fire({
                icon: 'error',
                title: 'Usuario fuera de servico',
                text: 'Comuniquese con su Administrador',
              })
              //pero si el usuario está activo verificamos que el dominio tambien lo esté mediante el siguiente siglo While
            } else {
              //ciclo for para saber si el email contiene un dominio valido
              while (i < this.domains.length) {

                //se guarda el valor de la propiedad "domain" del objeto en la posisición "i" guardada en otra variable llamada domain
                domain = this.domains[i].domain

                //si encuentra una cadena de texto en el form.email igual a la variable anterior "domain" la guardará en dominio valido
                if (form.email.indexOf(domain) > 0) {
                  dominioValido = domain
                  console.log('este es el dominio del correo')
                  console.log(dominioValido)
                }
                //el iterador recorre la longitud del arreglo donde traemos los correos validos de la base de datos
                i++
              }

              console.log('dominio encontrado')
              console.log(dominioValido)
              //si el form.email no coincide con los activos mandamos el siguiente mensaje
              if (dominioValido == null) {

                Swal.fire({
                  icon: 'info',
                  title: 'Dominio fuera de servicio',
                })
                //en caso de encontrar una similitud con los correos valido daremos acceso a la pantalla del calendario
              } else {
                this.http.post(this.apiUrl + '/Login', form).subscribe(res => {

                  this.localS.setLoc('usuario', JSON.stringify(res))
                  console.log(JSON.parse(this.localS.getLoc('usuario')))

                  this.router.navigate(['/calendar']);
                  Swal.fire({
                    icon: 'success',
                    title: 'Bienvenido',

                  })
                })
              }
            }

          })

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
