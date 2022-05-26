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

  LoggedInUser: any;
  ID:any;
  ProfileForm!: FormGroup;
  userForm!: FormGroup;
  Farmer:any=null;
  Dealer:any=null;
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
    this.LoggedInUser = this.userAuthService.isLoggedIn();
    if(this.LoggedInUser==true){
    this.route.paramMap.subscribe((params:ParamMap)=>{this.ID = <any>params.get('id');});
    this.User = this.userAuthService.getUser();
    if(this.ID!= this.User.id){
      alert("You are not authorized to view this page");
      this.router.navigate(['/profile/'+this.User.id]);
    }
    this.Userrole = this.userAuthService.getRoles().split('_')[1];
    if(this.Userrole == 'farmer'){
      this.FarmerService.getFarmer(this.User.id).subscribe(
        data => {
          this.Farmer = data;
          console.log(this.Farmer);
        },
        error => {
          this.errorMessage = error;
          console.log(this.errorMessage);
        }
      );
    }
  }
  else{
    alert('Please Login');
    this.router.navigate(['/login']);
  }
}
    printFarmer(){
      console.log(this.Farmer);
    }

}
