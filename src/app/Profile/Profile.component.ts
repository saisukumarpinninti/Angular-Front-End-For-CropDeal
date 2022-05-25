import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../_service/User.service';
import { UserauthService } from '../_service/userauth.service';
import { FarmerService } from '../_service/Farmer.service';
@Component({
  selector: 'app-Profile',
  templateUrl: './ProfileComponent.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ID:any;
  loginForm!: FormGroup;
  userForm!: FormGroup;
  Farmer:any=null;
  User: any;
  Userrole:any;
  errorMessage:any;
  constructor(
    private f: FormBuilder,
    private userService: UserService,
    private userAuthService: UserauthService,
    private route:ActivatedRoute,
    private router: Router,
    private FarmerService: FarmerService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.ID = <any>params.get('id');});
    this.User = this.userAuthService.getUser();
    this.Userrole = this.userAuthService.getRoles().split('_')[1];
    this.Farmer=this.FarmerService.getFarmer(this.ID).subscribe(
      (response: any) => {this.Farmer = response;});
    }
    printFarmer(){
      console.log(this.Farmer);
    }

}
