import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: number): string {
    if (Number(value.toString().substring(12,13)) % 2 === 0) {
      return 'Female';
    } else {
      return 'Male';
    }
    // return null;
  }

}
