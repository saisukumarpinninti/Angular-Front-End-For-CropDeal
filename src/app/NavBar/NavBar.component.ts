import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_service/User.service';
import { UserauthService } from '../_service/userauth.service';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  loggedin : Boolean = false;
  User: any;
  Userrole!: string;
  isFarmer!: boolean;
  constructor(
    private userService: UserService,
    private userAuthService: UserauthService,
    private router: Router,
 
  ) { }

  ngOnInit() {
    this.loggedin=this.userAuthService.isLoggedIn();
    if(this.loggedin){
    this.User = this.userAuthService.getUser();
    this.Userrole = this.userAuthService.getRoles().split('_')[1];
    this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
    if(this.Userrole=="Farmer"){
      this.isFarmer=true;
    }
  }
    
  }
  logout(){
    confirm('Are you sure you want to logout?');
    this.userAuthService.clear();
    this.userAuthService.setisLoggedIn(false);
    this.loggedin=false;
    return  this.router.navigate(['/Home']);
  }

}
