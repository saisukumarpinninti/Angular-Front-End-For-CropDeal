import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_service/User.service';
import { UserauthService } from '../_service/userauth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  userForm!: FormGroup;
  User: any;
  Userrole:any;
  errorMessage:any;
  submitted:Boolean=false;
  constructor(private f: FormBuilder,
    private userService: UserService,
    private userAuthService: UserauthService,
    private router: Router) { }

  ngOnInit():void {
    this.loginForm = this.f.group({
      usertype: ['', Validators.required],
      username: ['', [Validators.required,Validators.pattern('^[1-9]*$')]],
      password: ['', [Validators.required]]
    });
    //Checking if submitted or not 
    this.submitted=this.userAuthService.isLoggedIn();
    if(this.submitted!=false){
    this.User = this.userAuthService.getUser();
    this.Userrole = this.userAuthService.getRoles().split('_')[1];
    //remove last element in the string
    this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
    }
  }

    login(loginForm: any) {
    this.userForm = this.f.group({
      username:this.loginForm.value.usertype+this.loginForm.value.username,
      password:this.loginForm.get('password'),});

    this.userService.login(this.userForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setRoles(response.userDetails.role);
        this.userAuthService.setToken(response.jwt);
        this.userAuthService.setUser(response.userDetails);
        this.userAuthService.setisLoggedIn(true);
        location.reload();
        alert('Login Successful');
        const role = this.userAuthService.getRoles();
        if (role === 'ROLE_Farmer') {
          this.router.navigate(['/Home']);
        } else if (role === 'ROLE_Dealer') {
          this.router.navigate(['/crops']);}
        else  {
          this.router.navigate(['/Home']);
        }
      },
      (error) => {
        this.errorMessage = error.error.message;
        console.log(error);
      }
    );
  }

  
  logout(){
    this.userAuthService.clear();
    this.submitted=false;
    this.userAuthService.setisLoggedIn(false);
    return  this.router.navigate(['/Home']);
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
