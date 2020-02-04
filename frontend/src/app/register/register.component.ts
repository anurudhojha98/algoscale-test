import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "../../services/auth-user.service";
import { MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';

import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  constructor(
    public authService: AuthUserService,
    private matSnackeBar: MatSnackBar,
    private router:Router
  ) {}
  resisterObject: any = {};
  ngOnInit() {}
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  username=new FormControl('',[Validators.required])
  email = new FormControl('', [Validators.required,Validators.pattern(this.emailRegEx)]);
  password=new FormControl('',[Validators.required,Validators.minLength(8)])

  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
       this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('pattern') ? 'Not a valid email' :
        this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('minlength') ? 'Password should be 8 char' :
            '';
  }
  registerUser() {
    let returnedObj=this.confrmPwdAuth(this.resisterObject);
    this.authService.registerUser(returnedObj).subscribe(res => {
      if (res != null) {
        
        this.authService.setToken(res.res.token);
        this.router.navigate(['/profile']);
        this.matSnackeBar.open("User registered successfully.", "Ok", {
          duration: 3000
        });
      } else {
        this.matSnackeBar.open("User failed to register.", "Ok", {
          duration: 3000
        });
      }
    });
  }
  confrmPwdAuth(registerObject){
    let signUpObj={"username":"","email":"","password":""};
    if(registerObject.password!=registerObject.confirmpwd)
    {
      this.matSnackeBar.open("Pwassword authentication failed. ", "Ok", {
        duration: 3000
      });
    throw Error("Pwassword authentication failed. ");
    }
    signUpObj.username=registerObject.username;
    signUpObj.email=registerObject.email;
    signUpObj.password=registerObject.password;
   return signUpObj;
  }
}
