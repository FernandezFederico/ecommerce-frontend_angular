import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { UrlService } from './core/services/url.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce';

  onIsLoading$ = this.loadingService.isLoading$;

  constructor(
    private loadingService: LoadingService,
    private urlService: UrlService
  ) { }

  getImagesUrl(imagePath: string) {
    return this.urlService.getImagesUrl(imagePath);
  }

}
