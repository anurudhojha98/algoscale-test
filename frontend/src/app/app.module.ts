import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule,MatIconModule,
  MatListModule,
  MatTableModule,
  MatMenuModule
} from "@angular/material";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthUserIterceptorService } from '../services/auth-user-iterceptor.service';
@NgModule({
  declarations: [
    AppComponent, 
    RegisterComponent,
       LoginComponent,
     ProfileComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthUserIterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule {}
