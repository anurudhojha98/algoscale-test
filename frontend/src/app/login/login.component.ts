import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../services/auth-user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService:AuthUserService,
              private matSnackBar:MatSnackBar,
              private router:Router) { }
  loginObj: any = {};
   emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  ngOnInit() {
  }
  email = new FormControl('', [Validators.required,Validators.pattern(this.emailRegEx)]);
  password=new FormControl('',[Validators.required,Validators.minLength(8)])

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('pattern') ? 'Not a valid email' :
        this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('minlength') ? 'Password should be 8 char' :
            '';
  }
  onFormSubmit(userForm){
   if(userForm.valid){
    this.loginUser()
   }
  }
loginUser(){
  this.authService.loginUser(this.loginObj).subscribe((res)=>{
    let token=res.res.token;
    if(token!=null || token !='undefined'){
      this.authService.setToken(token);
      this.router.navigate(['/profile']);

    }
    this.matSnackBar.open('User login successfully','Ok',{duration:2000});
  },((err)=>{
    console.error(err)
  })
);
}
}
