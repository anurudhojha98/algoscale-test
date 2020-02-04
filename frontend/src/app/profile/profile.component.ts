import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private apiService:ApiService,
    private route:ActivatedRoute,private matSnackeBar:MatSnackBar) {}
    user:any;
    userList;
    displayedColumns: string[] = ['id', 'username', 'email','menu'];
    dataSource ;
  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
    this.apiService.getAllUsers().subscribe(result=>{
          this.dataSource=result
        console.log(result)
    },(err)=>{
      console.error(err)
    });

  }
  deleteUser(dataSource){
    this.apiService.deleteUser(dataSource._id).subscribe((user)=>{
      if(user!=null){
        this.matSnackeBar.open("User deleted successfully.", "Ok", {
          duration: 3000
        });
        this.ngOnInit()
      }
   },(err)=>{
    this.matSnackeBar.open(err.message, "Ok", {
      duration: 3000
    });
   });
  }

}
