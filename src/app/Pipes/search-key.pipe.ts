import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../Models/user';

@Pipe({
  name: 'searchKey'
})
export class SearchKeyPipe implements PipeTransform {

  transform(list: User[], text: string): User[] {
    return list.filter(item => item.firstName.toLowerCase().includes(text.toLowerCase())) || list.filter(item => item.lastName.toLowerCase().includes(text.toLowerCase()));
  }

}
