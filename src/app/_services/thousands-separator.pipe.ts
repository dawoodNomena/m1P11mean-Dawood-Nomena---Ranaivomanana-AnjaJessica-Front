import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsSeparator'
})
export class ThousandsSeparatorPipe implements PipeTransform {
  transform(value: number | string, args?: any): any {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}