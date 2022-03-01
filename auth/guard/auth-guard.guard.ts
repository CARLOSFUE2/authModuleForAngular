import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanLoad {

  constructor(private router: Router, private authService:AuthServiceService){

  }

  canLoad(): Observable<boolean > | Promise<boolean> | boolean {
    if(this.authService.isAuthenticated()){   
      return true;
    }else{
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
