import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../environments/environment"
@Injectable({
  providedIn: "root"
})
export class AuthUserService {
  constructor(private http: HttpClient) {}
  path:any=environment.path+"/auth";
  registerUser(userObj) {
    console.log(userObj)
    return this.http.post<any>(this.path+"/signup", userObj);
  }
  loginUser(userObj){
    console.log(userObj)
    return this.http.post<any>(this.path+"/login",userObj);

  }
   get isAuthenticated(){
    return !!localStorage.getItem("token");
  }
  setToken(token){
  localStorage.setItem("token",token);
  }
  get getToken(){
    return localStorage.getItem("token");
      }
  removeItem(item){
    localStorage.removeItem(item);
  }
}
