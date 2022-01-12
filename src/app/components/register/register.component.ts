import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  

 aFormGroup: FormGroup;
  

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    
  }

  registerfrom = new FormGroup({
    name: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    date: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required]),
    confirmarcontrasena: new FormControl('',[Validators.required]),
  });

  siteKey: string = "6LfG5OYdAAAAAL5ZPrG5LwS-nYlfYEtmETRgcAgO";

  get email(){
    return this.registerfrom.get('email');
  }

  get contrasena(){
    return this.registerfrom.get('contrasena');
  }

  get apellido(){
    return this.registerfrom.get('contrasena');
  }
 

  get date(){
    return this.registerfrom.get('contrasena');
  }

  get confirmarcontrasena(){
    return this.registerfrom.get('contrasena');
  }

  get name(){
    return this.registerfrom.get('contrasena');
  }
}
