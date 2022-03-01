import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export const retryCount = 3;
//export const retryWaitMilliSeconds = 1000;
@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  env = environment;
  constructor(private authservice:AuthServiceService, private http:HttpClient, private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.authservice.getLocalStorage('token');
    const urlRefresh = this.env.apiAuth + 'user/token/refresh';
        
    if (!token) {
          return next.handle(req);
    }
        
    const headers = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      
    return next.handle(headers).pipe(catchError(error => {

      if(error.url == urlRefresh){
        this.router.navigate(['/auth/login']);
        return throwError(error);
      }
      
      if (error.status === 401) {
          return this.authservice.refreshToken().pipe(
            switchMap(() => next.handle(headers))
            )
          }
          return throwError(error);
        })
      )
    }

  
  
}
