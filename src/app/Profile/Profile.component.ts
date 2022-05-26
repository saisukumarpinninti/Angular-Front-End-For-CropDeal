import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormGroup ,FormBuilder,Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  Farmer:any;
  Dealer:any;
  User: any;
  Userrole:any;
  errorMessage:any;
  constructor(
    private f: FormBuilder,
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
    if(this.ID!= this.User.id){alert("You are not authorized to view this page");this.router.navigate(['/Home']);}
    this.Userrole = this.userAuthService.getRoles().split('_')[1];
    this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
    if(this.Userrole == 'Farmer'){
      this.FarmerService.getFarmer(this.User.id).subscribe(
        data => {this.Farmer = data;this.patchFarmer();},
        error => {this.errorMessage = error;console.log(this.errorMessage);});
      this.ProfileForm = this.f.group({
        id: [{ value: '', disabled: true }, Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', Validators.required],
        dob: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: ['', [Validators.required, Validators.pattern('^[1-9]*$')]],
        address: ['', Validators.required],
        paymentInfo:['', Validators.required],
        status: ['', Validators.required]
      });
    }

  }
  else{
    alert('Please Login');
    this.router.navigate(['/login']);
  }
}
get password(){return this.ProfileForm.get('password');}
get id(){return this.ProfileForm.get('id');}
get firstName(){return this.ProfileForm.get('firstName');}
get lastName(){return this.ProfileForm.get('lastName');}
get email(){return this.ProfileForm.get('email');}
get mobileNumber(){return this.ProfileForm.get('mobileNumber');}
get address(){return this.ProfileForm.get('address');}
get dob(){return this.ProfileForm.get('dob');}
get paymentInfo(){return this.ProfileForm.get('paymentInfo');}
patchFarmer(){
  this.ProfileForm.patchValue({
    id: this.Farmer.id,
    firstName: this.Farmer.firstName,
    lastName: this.Farmer.lastName,
    email: this.Farmer.email,
    mobileNumber: this.Farmer.mobileNumber,
    address: this.Farmer.address,
    dob: this.Farmer.dob,
    paymentInfo: this.Farmer.paymentInfo,
    status: this.Farmer.status,
  });}
    printFarmer(){
      console.log(this.ProfileForm.value);
      // console.log(this.Farmer);
    }

}
