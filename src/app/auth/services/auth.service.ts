import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private _router:Router,
    @Inject(PLATFORM_ID) private platformId: Object

  ) {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('userToken') != null) {
      this.decodeToken();
      this._router.navigate([`${localStorage.getItem('currentPage')}`]);
    }
   }

  login(form : FormGroup  ) : Observable<any>
  {
   return this.http.post('https://dummyjson.com/auth/login',form)
  }

  private apiUrl = 'https://dummyjson.com/auth/login';


  loginTest(username: string, password: string): Observable<any> {
    const body = {
      username,
      password,
    };

    return this.http.post<any>(this.apiUrl, body);
  }
  userInfo = new BehaviorSubject(null)

  decodeToken() {
    
     this.userInfo.next(jwtDecode(JSON.stringify(localStorage.getItem('userToken'))));
  }

  logOutMain()
{
  // userInfo = null 
  //remove localstorage (token)
   //remove localstorage (current page)
  // router to log in 
    this._router.navigate(['/Auth/login']);
    localStorage.removeItem('userToken') ;
    this.userInfo.next(null);

 
}
}
