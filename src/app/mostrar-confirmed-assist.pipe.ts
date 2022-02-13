import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarConfirmedAssist'
})
export class MostrarConfirmedAssistPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value==true) return "Si";
    if(value==false) return "No";  }

}
