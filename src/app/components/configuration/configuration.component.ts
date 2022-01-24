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

idList:number | undefined;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required]),
  });

    
    ///////////instancia para llamar a la direccion de la API
    private apiUrl= environment.apiUrl;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


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

  editForm = new FormGroup({
    nombreE: new FormControl('', [Validators.required, Validators.email]),
    emailE: new FormControl('', [Validators.required]),
    typeE: new FormControl('', [Validators.required]),
    activeE: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //uso del get para traer los usuarios registrados en la base de dtaos mediante un select, al cargar la pagina
    this.http.get(this.apiUrl+'/Users').subscribe(res => {
      this.usersInDb = res;
    })

  }

  editarUsuario(usersInDb:any){
this.idList=usersInDb.id_user;
console.log('users in db'+ JSON.parse(usersInDb.first_name))

this.loginForm.patchValue({
  nombreE: usersInDb.first_name,
  emailE: usersInDb.email,
  typeE: usersInDb.id_user_type,
  activeE: usersInDb.is_active
})

}


  onSubmit(form: any) {

    console.log(form);

    try {


      this.http.post(this.apiUrl+'/Login', form).subscribe(res => {

        if (res == null) {

          console.log('Usuario o contraseña incorrectos')

        } else {


        } 
      })

    } catch (error) {
      console.log(error)
    }
  }
  get email2() {
    return this.loginForm.get('email');
  }

  get pass() {
    return this.loginForm.get('pass');
  }




}

