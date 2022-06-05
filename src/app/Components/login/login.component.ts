import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/User.service';
import { UserauthService } from '../../services/userauth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  userForm!: FormGroup;
  User: any;
  Userrole: any;
  errorMessage: any;
  submitted: Boolean = false;
  constructor(private f: FormBuilder,
    private userService: UserService,
    private userAuthService: UserauthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.f.group({
      usertype: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('^[1-9]*$')]],
      password: ['', [Validators.required]]
    });
    //Checking if submitted or not 
    this.submitted = this.userAuthService.isLoggedIn();
    if (this.submitted != false) {
      this.User = this.userAuthService.getUser();
      this.Userrole = this.userAuthService.getRoles().split('_')[1];
      //remove last element in the string
      this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
    }
  }

  login(loginForm: any) {
    this.userForm = this.f.group({
      username: this.loginForm.value.usertype + this.loginForm.value.username,
      password: this.loginForm.get('password'),
    });

    this.userService.login(this.userForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setRoles(response.userDetails.role);
        this.userAuthService.setToken(response.jwt);
        this.userAuthService.setUser(response.userDetails);
        this.userAuthService.setisLoggedIn(true);
        Swal.fire('Login Successful');
        const role = this.userAuthService.getRoles();
        if (role === 'ROLE_Farmer') {
          this.router.navigate(['/Home']);
        } else if (role === 'ROLE_Dealer') {
          this.router.navigate(['/crops']);
        }
        else {
          this.router.navigate(['/Home']);
        }
        location.reload();
      },
      (error) => {
        this.errorMessage = error.error.message;
        // console.log(error.status);
        if(error.status == 502){
          Swal.fire({
            title: 'Bad Credentials',
            text: 'Please Enter Correct Credentials',
            icon: 'error',
            confirmButtonColor: '#3085d6',
          })
        }

        else {Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please Try Again',
        });}
      }
    );
  }

  Register() {
    Swal.fire({
      title: 'Register As',
      text: "Please Select Your Role",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Farmer',
      cancelButtonText: 'Dealer'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/addUser/Farmer']);
      } else {
        this.router.navigate(['/addUser/Dealer']);
      }
    })
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
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get usertype() {
    return this.loginForm.get('usertype');
  }


}
