import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/User.service';
import { UserauthService } from '../../services/userauth.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.scss']
})
export class AdminComponent implements OnInit {
  loginForm!: FormGroup;
  User: any;
  errorMessage: any;
  submitted: Boolean = false;
  Userrole!: string;
  constructor(private f: FormBuilder,
    private userService: UserService,
    private userAuthService: UserauthService,
    private router: Router) { }

  ngOnInit() {

    // Checking if submitted or not 
    this.submitted = this.userAuthService.isLoggedIn();
    // this.submitted= true;
    if (this.submitted != false) {
      this.User = this.userAuthService.getUser();
      this.Userrole = this.userAuthService.getRoles().split('_')[1];
      //remove last element in the string
      this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
      this.Userrole = 'Admin';
      if (this.Userrole === 'Admin') {

      }
      else {
        Swal.fire('You are not an Admin', '', 'error');
        this.router.navigate(['/Home']);
      }
    }
    else if (this.submitted == false) {
      Swal.fire('You are not LoggedIn', '', 'error');
      this.loginForm = this.f.group({
        username: ['', [Validators.required, Validators.pattern('^[1-9]*$')]],
        password: ['', [Validators.required]]
      });
    }
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  login(loginForm: any) {
    this.loginForm.value.username = 'A' + this.loginForm.value.username;
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setRoles(response.userDetails.role);
        this.userAuthService.setToken(response.jwt);
        this.userAuthService.setUser(response.userDetails);
        this.userAuthService.setisLoggedIn(true);
        Swal.fire('Login Successful');
        const role = this.userAuthService.getRoles();
        location.reload();
      },
      (error) => {
        this.errorMessage = error.error.message;
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please Try Again',
        });
      }
    );
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't  to Logout!",
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
        this.submitted = false;
        this.userAuthService.setisLoggedIn(false);
      }
    })
    return this.router.navigate(['/']);
  }
}
