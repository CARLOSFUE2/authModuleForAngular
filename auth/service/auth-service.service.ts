import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  env = environment;

  constructor(private http:HttpClient, private router:Router) { }

  login(payload){
    return this.http.post(this.env.apiAuth + 'user/login', payload)
  }

  isAuthenticated(){
    //let data: any = this.authServiceToken.get();
    let token = this.getLocalStorage('token');
    if(token){
      return true;
    }else{
      return false;
    }
  }

  refreshToken() {
    let data = {refresh_token:this.getLocalStorage('refresh_token')}  
   return new Observable(observer => {
      this.http.post(this.env.apiAuth + 'user/token/refresh', data).subscribe((resp:any) => {      
        this.insertLocalStorage('token', resp.token )
        this.insertLocalStorage('refresh_token', resp.refresh_token )
        observer.next();
        observer.complete();
      });
    });
  }


  /* LocalStorage*/
  insertLocalStorage(key:string,value:any){
    localStorage.setItem(key,value);
  }
  
  getLocalStorage(key:string){
    //JSON.parse(localStorage.getItem(key))
    return localStorage.getItem(key)
  }
}
