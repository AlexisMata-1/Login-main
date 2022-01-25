import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  registerform: FormGroup;


  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router) { }

    ///////////instancia para llamar a la direccion de la API
    private apiUrl= environment.apiUrl;


  ngOnInit() {



    this.registerform = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      first_name: new FormControl  ('',{
        validators: [Validators.required,Validators.minLength(3)]}),
      last_name: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl ('',{
        validators: [Validators.required,Validators.minLength(9)]}),
      confirmarcontrasena: new FormControl ('',{
        validators: [Validators.required,Validators.minLength(9)]}),
    });

  }

  sendRegister(): any {

    let userData = {
      id_user_type: 3,
      first_name: this.registerform.value.first_name,
      last_name: this.registerform.value.last_name,
      dob: this.registerform.value.date,
      email: this.registerform.value.email,
      pass: this.registerform.value.contrasena,
      is_active: true
    }
    this.http.post(this.apiUrl + '/Users', userData).subscribe(res => {

      const respuesta=JSON.stringify(res) 
      if (respuesta.length>30) {

        console.log(res)
        console.log('Usuarios Registrado exitosamente')
        this.router.navigate(['/login']);

      }else{
        console.log(res)
      }



    })

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
    return '';
  }


  errorlastName() {
    var campo = this.registerform.get('last_name');
    if (campo?.hasError('required')) {
      return ' El apellido es requerido'
    }
    return '';
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
