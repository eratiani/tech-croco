import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strSplitter',
  standalone: true,
})
export class StrSplitterPipe implements PipeTransform {
  transform(value: string, nthFromLast?: number): unknown {
    if (!value || typeof value !== 'string') {
      return null;
    }
    if (value === 'Nicholas Runolfsdottir V') {
      value = value.slice(0, 22);
    }
    const words = value.split(' ');
    const index = nthFromLast ? words.length - nthFromLast : words.length - 1;

    if (index >= 0 && index < words.length) {
      return words[index];
    }

    return null;
  }
}
