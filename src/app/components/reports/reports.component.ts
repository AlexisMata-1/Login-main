import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

export interface UsersRegis {
  name: string;
  position: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  registerDb: any = [];

  consultForm = new FormGroup({
    dia: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient) { }

    
    ///////////instancia para llamar a la direccion de la API
    private apiUrl= environment.apiUrl;

  ngOnInit(): void {

  
  }

  ConsultarRegistro(): any {
    this.consultForm.controls['dia'].setValue(this.consultForm.value.dia)
    let consulta = {
      date: this.consultForm.value.dia
    }
    // console.log(consulta)

    this.http.post(this.apiUrl+'/Registerr', consulta).subscribe(res => {
      // console.log(res)
      this.registerDb = res;

    });
  }

  get dia() {
    return this.consultForm.get('dia');
  }
}
