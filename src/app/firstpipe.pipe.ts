import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  //type defined

  name: 'firstpipe'

})
export class FirstpipePipe implements PipeTransform {

  transform(value: any) {
    return value.toUppercase();
  }

}
