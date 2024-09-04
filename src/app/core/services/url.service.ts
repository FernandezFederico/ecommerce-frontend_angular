import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private apiUrl = 'environment.apiUrl';

  constructor() { }

  getImagesUrl(imagePath: string) {
    return `${this.apiUrl}${imagePath}`;
  }
}
