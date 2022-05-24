import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_service/User.service';
import { UserauthService } from '../_service/userauth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm!: FormGroup;
  userForm!: FormGroup;
  constructor(private f: FormBuilder,
    private userService: UserService,
    private userAuthService: UserauthService,
    private router: Router) { }


  ngOnInit():void {
    this.loginForm = this.f.group({
      usertype: ['F', Validators.required],
      username: [3, [Validators.required,Validators.pattern('^[1-9]*$')]],
      password: ['s', [Validators.required]]
    });
    
  }

  login(loginForm: any) {
    this.userForm = this.f.group({
      username:this.loginForm.value.usertype+this.loginForm.value.username,
      password:this.loginForm.get('password'),
    });
    this.userService.login(this.userForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.userAuthService.setRoles(response.userDetails.role);
        this.userAuthService.setToken(response.jwt);
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
        console.log(error);
      }
    );
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
