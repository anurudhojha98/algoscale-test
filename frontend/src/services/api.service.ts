import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../environments/environment"
@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}
  path:any=environment.path;
  getAllUsers() {
    return this.http.get(this.path+"/api/users");
  }
  deleteUser(id){
    return this.http.delete(this.path+"/api/user/"+id);

  }
}
