import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

export interface Fruit {
  name: string;
}

interface UserType {
  value: number;
  viewValue: string;
}
interface IsActive {
  value: number;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  email: string;
}

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

    
    ///////////instancia para llamar a la direccion de la API
    private apiUrl= environment.apiUrl;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  userType: UserType[] = [
    { value: 1, viewValue: 'Administrador' },
    { value: 2, viewValue: 'Colaborador' },
  ];

  activo: IsActive[] = [
    { value: 1, viewValue: 'Activo' },
    { value: 0, viewValue: 'Inactivo' },
  ];
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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  usersInDb: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.apiUrl+'/Users').subscribe(res => {
      this.usersInDb = res;
    })

  }

}
