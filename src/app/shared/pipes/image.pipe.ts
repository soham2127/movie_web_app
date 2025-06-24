import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true,
})
export class ImagePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value?.trim()) {
      return `https://image.tmdb.org/t/p/w500${value}`;
    }
    return 'assets/images/fallback.jpg'; // or any placeholder
  }
}
