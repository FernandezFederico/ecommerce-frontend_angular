import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce';

  onIsLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) { }


}
