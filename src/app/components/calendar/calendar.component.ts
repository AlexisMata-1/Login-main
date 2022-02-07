import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { localStorageService } from 'src/app/shared/localstorage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface usuarioI {
  id_user: number;
  id_user_type: number;
  first_name: string;
  last_name: string;
  email: string;
  confirmed_assist: boolean

}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {



  ////////////////Arreglo de usuarios 1er dia
  listUsuarios: any = [];
  ////////////////Arreglo de usuarios 2do dia
  listUsuarios2: any = [];

  ////////////////Arreglo de usuarios 3er dia
  listUsuarios3: any = [];

  ////////////////Arreglo de usuarios 4to dia
  listUsuarios4: any = [];

  ////////////////Arreglo de usuarios 5to dia
  listUsuarios5: any = [];

  ////////////////Arreglo de usuarios 6to dia
  listUsuarios6: any = [];


  obtenerFecha(fecha: Date) {
    if (fecha.getDay() == 0 || fecha.getDay() == 6) {
      return true
    } else {
      return false
    }
  }

  /////////////Funcion para sumarle un día a la fecha actual
  sumarDias(fecha: Date, dias: number) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  ///////////////funcion para transofrmas dias en texto

  traerDias(fecha: number) {
    if (fecha == 0) {
      return "Domingo"
    } else if (fecha == 1) {
      return "Lunes"
    } else if (fecha == 2) {
      return "Martes"
    } else if (fecha == 3) {
      return "Miercoles"
    } else if (fecha == 4) {
      return "Jueves"
    } else if (fecha == 5) {
      return "Viernes"
    } else if (fecha == 6) {
      return "Sabado"
    } else {
      return ''
    }
  }


  /////variable para interpolar en el front
  d = new Date();

  /////////////////variable para guardar los dias
  varDay = new Date();
  day1 = this.varDay.toString();
  day2 = (this.sumarDias(this.varDay, 1)).toString();
  day3 = (this.sumarDias(this.varDay, 1)).toString();
  day4 = (this.sumarDias(this.varDay, 1)).toString();
  day5 = (this.sumarDias(this.varDay, 1)).toString();
  day6 = (this.sumarDias(this.varDay, 1)).toString();
  day7 = (this.sumarDias(this.varDay, 1)).toString();
  /////////////////////////////conviertiendo dias de arriba en fecha para validaciones
  dia0 = new Date(this.day1);
  dia1 = new Date(this.day2);
  dia2 = new Date(this.day3);
  dia3 = new Date(this.day4);
  dia4 = new Date(this.day5);
  dia5 = new Date(this.day6);
  dia6 = new Date(this.day7);
  date = new Date(this.day1)

  public events: any[];
  public options: any;
  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public localS: localStorageService,
  ) { }

  ///////////instancia para llamar a la direccion de la API
  private apiUrl = environment.apiUrl;

  ngOnInit(): void {



    //console.log(this.dia1)
    //console.log('------------------------------------------------------')
    //console.log(this.isUser())

    ////////////////////////////CONSULTA USUARIOS DIA1//////////////////////////////////////
    let consulta = {
      date: this.dia1
    }
    this.http.post(this.apiUrl + '/Register', consulta).subscribe(res => {
      this.listUsuarios = res;
      //console.log(this.listUsuarios)
    });

    //////////////////////////////////CONSULTA USUARIO DIA2///////////////////////////////

    let consulta2 = {
      date: this.dia2
    }
    this.http.post(this.apiUrl + '/Register', consulta2).subscribe(res => {
      this.listUsuarios2 = res;
      //console.log(this.listUsuarios2)
    });

    //////////////////////////////////CONSULTA USUARIO DIA3///////////////////////////////

    let consulta3 = {
      date: this.dia3
    }
    this.http.post(this.apiUrl + '/Register', consulta3).subscribe(res => {
      this.listUsuarios3 = res;
      //console.log(this.listUsuarios3)
    });
    //////////////////////////////////CONSULTA USUARIO DIA4///////////////////////////////

    let consulta4 = {
      date: this.dia4
    }
    this.http.post(this.apiUrl + '/Register', consulta4).subscribe(res => {
      this.listUsuarios4 = res;
      //console.log(this.listUsuarios4)
    });

    //////////////////////////////////CONSULTA USUARIO DIA5///////////////////////////////

    let consulta5 = {
      date: this.dia5
    }
    this.http.post(this.apiUrl + '/Register', consulta5).subscribe(res => {
      this.listUsuarios5 = res;
      //console.log(this.listUsuarios5)
    });

    //////////////////////////////////CONSULTA USUARIO DIA6///////////////////////////////

    let consulta6 = {
      date: this.dia6
    }
    this.http.post(this.apiUrl + '/Register', consulta6).subscribe(res => {
      this.listUsuarios6 = res;
      //console.log(this.listUsuarios6)
    });



  }
  ///////////////INSTANCIA DE LOS DATOS DATOS GUARDADOS EN EL LOGIN 
  formU = JSON.parse(this.localS.getLoc('usuario'));

  /////////////////////////////////////////////////////////////////////SABER SI ES ADMIN O NO
  isUser() {
    if (this.formU.id_user_type == 3) {
      return true
    } else {
      return false
    }
  }


  ///////////////evento click de los botones Registrar en cada día
  Registro1() {

    const form1 = {
      id_user: this.formU.id_user,
      id_user_type: this.formU.id_user_type,
      first_name: this.formU.first_name,
      last_name: this.formU.last_name,
      email: this.formU.email,
      confirmed_assist: true,
      date: this.dia1
    }
    this.http.post(this.apiUrl + '/Registers', form1).subscribe(res => {
      // //console.log(res)
      let respuesta: any = []
      respuesta = res

      if (respuesta.msg == "Usuario ya registrado") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,
        })

      } else {

        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })

        this.listUsuarios.push(form1);

      }


    })

  }

  Eliminar1() {

    const form1 = {
      id_user: this.formU.id_user,
      confirmed_assist: false,
      date: this.dia1
    }
    this.http.put((this.apiUrl + '/Registers/' + this.formU.id_user), form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res
      // //console.log(respuesta)
      if (respuesta.msg == "No estas registrado en este dia") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,
        })

      } else {

        Swal.fire({
          icon: 'success',
          title: respuesta.msg,
        })

        this.listUsuarios.pop();

      }

    })
  }
  ///////////////evento click de los botones Registrar en cada día
  Registro2() {

    const form1 = {
      id_user: this.formU.id_user,
      id_user_type: this.formU.id_user_type,
      first_name: this.formU.first_name,
      last_name: this.formU.last_name,
      email: this.formU.email,
      confirmed_assist: true,
      date: this.dia2
    }
    this.http.post(this.apiUrl + '/Registers', form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res
   if (respuesta.msg == "Usuario ya registrado") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,
        })

      } else {

        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })

        this.listUsuarios2.push(form1);

      }
    })
  }

  Eliminar2() {

    const form1 = {
      id_user: this.formU.id_user,
      confirmed_assist: false,
      date: this.dia2
    }
    this.http.put((this.apiUrl + '/Registers/' + this.formU.id_user), form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res
      // console.log(respuesta)
      if (respuesta.msg == "No estas registrado en este dia") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,

        })

      } else {
        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })
        this.listUsuarios2.pop();

      }

    })
  }
  ///////////////evento click de los botones Registrar en cada día
  Registro3() {

    const form1 = {
      id_user: this.formU.id_user,
      id_user_type: this.formU.id_user_type,
      first_name: this.formU.first_name,
      last_name: this.formU.last_name,
      email: this.formU.email,
      confirmed_assist: true,
      date: this.dia3
    }
    this.http.post(this.apiUrl + '/Registers', form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res

      if (respuesta.msg == "Usuario ya registrado") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,
        })

      } else {

        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })

        this.listUsuarios3.push(form1);

      }


    })

  }

  Eliminar3() {
    const form1 = {
      id_user: this.formU.id_user,
      confirmed_assist: false,
      date: this.dia3
    }
    this.http.put((this.apiUrl + '/Registers/' + this.formU.id_user), form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res
      //console.log(respuesta)
      if (respuesta.msg == "No estas registrado en este dia") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,

        })

      } else {
        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })
            this.listUsuarios3.pop();

      }

    })
  }
  ///////////////evento click de los botones Registrar en cada día
  Registro4() {

    const form1 = {
      id_user: this.formU.id_user,
      id_user_type: this.formU.id_user_type,
      first_name: this.formU.first_name,
      last_name: this.formU.last_name,
      email: this.formU.email,
      confirmed_assist: true,
      date: this.dia4
    }
    this.http.post(this.apiUrl + '/Registers', form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res
      if (respuesta.msg == "Usuario ya registrado") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,
        })

      } else {

        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })

        this.listUsuarios4.push(form1);

      }


    })

  }
  Eliminar4() {
    const form1 = {
      id_user: this.formU.id_user,
      confirmed_assist: false,
      date: this.dia4
    }
    this.http.put((this.apiUrl + '/Registers/' + this.formU.id_user), form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res
      //console.log(respuesta)
      if (respuesta.msg == "No estas registrado en este dia") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,

        })

      } else {
        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })
         this.listUsuarios4.pop();

      }

    })
  }
  ///////////////evento click de los botones Registrar en cada día
  Registro5() {

    const form1 = {
      id_user: this.formU.id_user,
      id_user_type: this.formU.id_user_type,
      first_name: this.formU.first_name,
      last_name: this.formU.last_name,
      email: this.formU.email,
      confirmed_assist: true,
      date: this.dia5
    }
    this.http.post(this.apiUrl + '/Registers', form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res

      if (respuesta.msg == "Usuario ya registrado") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,
        })

      } else {

        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })

        this.listUsuarios5.push(form1);

      }


    })

  }

  Eliminar5() {

    const form1 = {
      id_user: this.formU.id_user,
      confirmed_assist: false,
      date: this.dia5
    }
    this.http.put((this.apiUrl + '/Registers/' + this.formU.id_user), form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res
      //console.log(respuesta)
      if (respuesta.msg == "No estas registrado en este dia") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,

        })

      } else {
        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })
            this.listUsuarios5.pop();

      }

    })
  }
  ///////////////evento click de los botones Registrar en cada día
  Registro6() {

    const form1 = {
      id_user: this.formU.id_user,
      id_user_type: this.formU.id_user_type,
      first_name: this.formU.first_name,
      last_name: this.formU.last_name,
      email: this.formU.email,
      confirmed_assist: true,
      date: this.dia6
    }
    this.http.post(this.apiUrl + '/Registers', form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res

      if (respuesta.msg == "Usuario ya registrado") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,
        })

      } else {

        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })

        this.listUsuarios6.push(form1);

      }


    })

  }
  Eliminar6() {

    const form1 = {
      id_user: this.formU.id_user,
      confirmed_assist: false,
      date: this.dia6
    }
    this.http.put((this.apiUrl + '/Registers/' + this.formU.id_user), form1).subscribe(res => {
      let respuesta: any = []
      respuesta = res
      //console.log(respuesta)
      if (respuesta.msg == "No estas registrado en este dia") {

        Swal.fire({
          icon: 'info',
          title: respuesta.msg,

        })

      } else {
        Swal.fire({
          icon: 'success',
          title: respuesta.msg,

        })
            this.listUsuarios6.pop();

      }

    })
  }
}
