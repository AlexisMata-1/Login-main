import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  registerform: FormGroup;
  respuestaDominio: any = [];

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) {

  }

  ///////////instancia para llamar a la direccion de la API
  private apiUrl = environment.apiUrl;


  ngOnInit() {

    this.registerform = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      first_name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zñ A-ZÑ]+$')]
      }),
      last_name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zñ A-ZÑ]+$')]
      }),
      date: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      domain: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', {
        validators: [Validators.required, Validators.minLength(9)]
      }),
      confirmarcontrasena: new FormControl('', {
        validators: [Validators.required, Validators.minLength(9)]
      }),
    });

  }

  sendRegister(): any {

    let userData = {
      id_user_type: 3,
      first_name: this.registerform.value.first_name,
      last_name: this.registerform.value.last_name,
      dob: this.registerform.value.date,
      email: this.registerform.value.email + '@' + this.registerform.value.domain,
      pass: this.registerform.value.contrasena,
      is_active: true
    }

    const diaActual = new Date();
    const fechaForm = this.registerform.value.date;
    const yearsValid = diaActual.getFullYear() - fechaForm.getFullYear()
    const pass1 = this.registerform.value.contrasena
    const pass2 = this.registerform.value.confirmarcontrasena

    console.log(userData)
    if (yearsValid < 17) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fecha de nacimiento fuera del rango',
      })

    } else if (pass1 != pass2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
      })

    }
    else {

      let dominio = {
        domain: this.registerform.value.domain
      }
      console.log('este es el domio')
      console.log(dominio)

      this.http.post(this.apiUrl + '/Domains', dominio).subscribe(res => {
        this.respuestaDominio = res
        console.log('esta es la respuesta del backend')

        console.log(this.respuestaDominio)
        console.log('----------------------')
        if (this.respuestaDominio.length != 0) {

          this.http.post(this.apiUrl + '/Users', userData).subscribe(res => {

            const respuesta = JSON.stringify(res)
            if (respuesta.length > 30) {

              console.log(res)
              console.log('Usuarios Registrado exitosamente')
              this.router.navigate(['/login']);

            } else {
              console.log(res)
            }

          })
        } else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Dominio no válido',
          })

        }
      })

    }


  }


  siteKey: string = "6LfG5OYdAAAAAL5ZPrG5LwS-nYlfYEtmETRgcAgO";



  errorName() {
    var campo = this.registerform.get('first_name');
    if (campo?.hasError('required')) {
      return ' El  nombre es requerido'
    }
    if (campo?.hasError('minlength')) {
      return 'Longitud mínima de 3 caracteres'
    }
    return campo?.hasError('pattern') ? 'Solo se permiten letras' : '';
  }


  errorlastName() {
    var campo = this.registerform.get('last_name');
    if (campo?.hasError('required')) {
      return ' El apellido es requerido'
    }
    return campo?.hasError('pattern') ? 'Solo se permiten letras' : '';
  }

  errorDate() {
    var campo = this.registerform.get('date');
    if (campo?.hasError('required')) {
      return ' Fecha de Nacimiento requerida'
    }
    return '';
  }

  errorEmail() {
    var campo = this.registerform.get('email');
    if (campo?.hasError('required')) {
      return ' El correo es requerido'
    }
    return '';
  }

  errorDomain() {
    var campo = this.registerform.get('domain');
    if (campo?.hasError('required')) {
      return ' El dominio es requerido'
    }
    return '';
  }

  errorPass() {
    var campo = this.registerform.get('contrasena');
    if (campo?.hasError('required')) {
      return 'La Contraseña es requerida'
    }
    if (campo?.hasError('minlength')) {
      return 'La contraseña debe contener minimo 9 caracteres'
    }

    return '';
  }

  errorConfPass() {
    var campo = this.registerform.get('confirmarcontrasena');
    if (campo?.hasError('required')) {
      return 'Confirmar Contraseña'
    }
    return '';
  }
}
