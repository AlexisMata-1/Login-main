import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostraUserType'
})
export class MostraUserTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value==1) return "Super Administrador";
    if (value==2) return "Administrador";
    if (value==3) return "Colaborador";
  }

}
