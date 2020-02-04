import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {AuthUserService} from './auth-user.service'
@Injectable({
  providedIn: 'root'
})
export class AuthUserIterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req,next){
     var auth=this.injector.get(AuthUserService);
     var authRequest= req.clone({
      headers:req.headers.set("Authorization",'Bearer '+auth.getToken)

    });
   return next.handle(authRequest);
  }
}
