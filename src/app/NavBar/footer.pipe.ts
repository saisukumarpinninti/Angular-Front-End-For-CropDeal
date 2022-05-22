import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'footer'
})
export class FooterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
