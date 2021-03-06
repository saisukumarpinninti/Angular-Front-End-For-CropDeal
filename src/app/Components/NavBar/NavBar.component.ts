import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/User.service';
import { UserauthService } from '../../services/userauth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.scss']
})
export class NavBarComponent implements OnInit {

  loggedin: Boolean = false;
  User: any;
  Userrole!: string;
  isFarmer!: boolean;
  isAdmin!: boolean;
  constructor(
    private userService: UserService,
    private userAuthService: UserauthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.loggedin = this.userAuthService.isLoggedIn();
    if (this.loggedin) {
      this.User = this.userAuthService.getUser();
      this.Userrole = this.userAuthService.getRoles().split('_')[1];
      this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
      if (this.Userrole == "Farmer") {
        this.isFarmer = true;
      }
      if (this.Userrole == "Admin") {
        this.isAdmin = true;
      }
    }

  }
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You wan't  to Logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'LoggedOut!',
          'Your have LoggedOut SuccesFully.',
          'success'
        )
        this.userAuthService.clear();
        this.userAuthService.setisLoggedIn(false);
        this.loggedin = false;
      }
    })
    return this.router.navigate(['Home']);

  }

}
