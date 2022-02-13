import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarIsActive'
})
export class MostrarIsActivePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
  if(value==true) return "Activo";
  if(value==false) return "Inactivo";
  }

}
