import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthUserService } from '../services/auth-user.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "frontend";
  update=false;
  isValid=false;
  constructor(public authService:AuthUserService,
    private router:Router
  ) {
  }
  ngOnInit() {
    this.isValid=this.authService.isAuthenticated;
    this.redirectToLogin(this.isValid);
  }
  redirectToLogin(isValid){
    if(!isValid){
     this.router.navigate(['/login']);
}
  }
  logout(){
    this.authService.removeItem("token");
    this.ngOnInit();
  }
}
