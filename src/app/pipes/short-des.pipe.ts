import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDes'
})
export class ShortDesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
