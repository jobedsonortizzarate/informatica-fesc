import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formError' })
export class FormErrorPipe implements PipeTransform {
  public transform(value: any | object): string {
    if (!value) {
      return '';
    }
    if (typeof value !== 'object') {
      return value;
    }
    const key: string = value[Object.keys(value)[0]];

    return key;
  }
}
