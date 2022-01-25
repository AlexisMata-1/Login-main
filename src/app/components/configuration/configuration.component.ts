import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

export interface Fruit {
  name: string;
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


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{ name: 'arkus.com' }, { name: 'arkus-solutions.com' }, { name: 'arkusnexus.com' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({ name: value });
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


  usersInDb: any = [];
  
//FORMGROUP DEL FORMULARIO DE EDITAR USUARIO
  editForm = new FormGroup({
    id_user:new FormControl(''),
    first_name: new FormControl('', [Validators.required]),
    last_name:new FormControl(''),
    dob:new FormControl(''),
    email: new FormControl('', [Validators.required]),
    id_user_type: new FormControl('', [Validators.required]),
    is_active: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //uso del get para traer los usuarios registrados en la base de dtaos mediante un select, al cargar la pagina
    this.http.get(this.apiUrl + '/Users').subscribe(res => {
      this.usersInDb = res;
    })

  }


  //ACCION DEL BOTON DE EDITAR A LADO DE CADA USUARIOS
  editarUsuario(form: any) {
    this.idList = form.id_user;
    const userEdit = form;
    console.log(userEdit)
//ASIGNA LOS VALORES DEL USUARIO AL FORMULARIO DE EDITAR Y GUARDA LOS DEMÁS DATOS DEL USUARIO
    this.editForm.patchValue({
      id_user:userEdit.id_user,
      first_name: userEdit.first_name,
      last_name: userEdit.last_name,
      dob:userEdit.dob,
      email: userEdit.email,
      id_user_type:userEdit.id_user_type,
      is_active:userEdit.is_active
    })
console.log(this.editForm)

  }


//ACCION DEL BOTON DE GUARDAR DEL FORMULARIO DE EDITAR
  guardarCambios(editForm: any) {

    const usuarioEd=editForm;
    console.log(usuarioEd);
        try {
          this.http.put((this.apiUrl + '/Users/' + usuarioEd.id_user), editForm).subscribe(res => {

            if (res == null) {

              console.log('No se pudo cambiar la info')

            } else {

              console.log(res)
              this.editForm.reset();
              this.http.get(this.apiUrl + '/Users').subscribe(res => {
                this.usersInDb = res;
              })
            }
          })

        } catch (error) {
          console.log(error)
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




}

