import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

/////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
export interface Fruit {
  name: string;
}

export interface UsersType {
  value: number;
  viewValue: string;
}
export interface Conditions {
  value: boolean;
  viewValue: string;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  idList: number | undefined;


  ///////////instancia para llamar a la direccion de la API
  private apiUrl = environment.apiUrl;


  //ARREGLO PARA GUARDAR LOS USUARIOS
  dominiosInDb: any = [];

  //ARREGLO PARA GUARDAR LOS USUARIOS
  usersInDb: any = [];



  //FORMGROUP DEL FORMULARIO DE DOMINIOS
  public dominioForm:FormGroup


  //FORMGROUP DEL FORMULARIO DE EDITAR USUARIO
  public editForm: FormGroup

  // COMBOBOX DE LOS TIPOS DE USUARIOS Y SUS VALORES 
  usersType: UsersType[] = [
    { value: 1, viewValue: 'Super Administrador' },
    { value: 2, viewValue: 'Administrador' },
    { value: 3, viewValue: 'Colaborador' },
  ]

  //COMBOBOX PARA CAMBIAR EL IS_ACTIVE
  condition:Conditions[]=[
    {value:true , viewValue: 'Activo'},
    {value:false, viewValue: 'Inactivo'},

  ]
  constructor(private http: HttpClient,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

this.dominioForm=this.fb.group({
  emailV: new FormControl('', [Validators.required, Validators.minLength(5),Validators.pattern('[^@]')]),

})

    this.editForm = this.fb.group({
      id_user: new FormControl(''),
      last_name: new FormControl(''),
      dob: new FormControl(''),
      first_name: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      id_user_type: new FormControl('', [Validators.required]),
      is_active: new FormControl('', [Validators.required]),
    })

    
    //uso del get para traer los usuarios registrados en la base de dtaos mediante un select, al cargar la pagina
    this.http.get(this.apiUrl + '/Users').subscribe(res => {
      this.usersInDb = res;
    })

    //PETICION PARA CARGAR LOS DOMINIOS ACEPTADOS A LA LISTA
    this.http.get(this.apiUrl + '/Domain').subscribe(res1 => {
      this.dominiosInDb = res1;
    })
  }


  //BOTON DE AGREGAR DOMINIO EN LA SECCION DE CORREOS ACEPTADOS
  agregarDominio() {

    let dominio = {
      domain: this.dominioForm.value.emailV,
      is_active: true
    }
    console.log(dominio)
    this.http.post(this.apiUrl + '/Domain', dominio).subscribe(res => {
      console.log(res)

      this.dominioForm.reset();

    })
  }
  ///////////////////////////////////////////////BORRAR DOMINIO
  borrarDominio(index: number) {
    let dominioBorrado = this.dominiosInDb[index]

    Swal.fire({
      title: 'ELIMINAR DOMINIO?',
      text: "Este dominio dejará de ser válido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si quiero borrarlo',
      cancelButtonText: 'No quiero'
    }).then((result) => {
      if (result.isConfirmed) {

        this.http.put((this.apiUrl + '/Domain/' + dominioBorrado.id_domain), dominioBorrado).subscribe(res => {

          Swal.fire({
            icon: 'success',
            title: 'Acción exitosa',
            text: 'Dominio eliminado exitosamente',
          })
          this.dominiosInDb.splice(index, 1);

        })

      }
    })



  }



  //ACCION DEL BOTON DE EDITAR A LADO DE CADA USUARIOS
  editarUsuario(form: any) {
    this.idList = form.id_user;

    const userEdit = form;
    console.log(userEdit)
    //ASIGNA LOS VALORES DEL USUARIO AL FORMULARIO DE EDITAR Y GUARDA LOS DEMÁS DATOS DEL USUARIO
    this.editForm.patchValue({
      id_user: userEdit.id_user,
      first_name: userEdit.first_name,
      last_name: userEdit.last_name,
      dob: userEdit.dob,
      email: userEdit.email,
      id_user_type: userEdit.id_user_type,
      is_active: userEdit.is_active
    })
    console.log(this.editForm)

  }


  //ACCION DEL BOTON DE GUARDAR DEL FORMULARIO DE EDITAR
  guardarCambios(formGuardar: any) {

    const usuarioEd = formGuardar;
    console.log(usuarioEd);
    try {
      this.http.put((this.apiUrl + '/Users/' + usuarioEd.id_user), formGuardar).subscribe(res => {

        if (res == null) {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo cambiar la información',
          })

        } else {

          Swal.fire({
            icon: 'success',
            title: 'Acción exitosa',
            text: 'Usuario cambiado exitosamente',
          })
          
          this.editForm.reset();
          this.http.get(this.apiUrl + '/Users').subscribe(res => {
            this.usersInDb = res;
          })
        }
      })

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
      })
    }
  }


  userTypeError() {
    var campo = this.editForm.get('id_user_type');
    if (campo?.hasError('required')) {
      return 'Asignar un valor'
    }
    return '';
  }

  isActiveError() {
    var campo = this.editForm.get('is_active');
    if (campo?.hasError('required')) {
      return 'Asignar un valor'
    }
    return '';
  }


  errorEmailV() {
    var campo = this.dominioForm.get('emailV');
    if (campo?.hasError('required')) {
      return 'El correo es requerido'
    }
    if (campo?.hasError('minlength')) {
      return 'Longitud Minima de 5 caracteres'
    }
    if(campo.hasError('email')){
      return 'Se requiere un punto'
    }
    return '';
  }

}

