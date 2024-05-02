import {  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Activa el indicador de carga antes de hacer la solicitud
    this.loadingService.showLoading();

    // Continúa con la solicitud HTTP
    return next.handle(req).pipe(
      // Finaliza el indicador de carga después de que la solicitud se complete
      finalize(() => this.loadingService.hideLoading())
    );
  }
}
