import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]) ,
    contrasena: new FormControl('',[Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get contrasena(){
    return this.loginForm.get('contrasena');
  }
}
