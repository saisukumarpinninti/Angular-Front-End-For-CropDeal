import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserauthService } from '../_service/userauth.service';
import { FarmerService } from '../_service/Farmer.service';
import { DealerService } from '../_service/Dealer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss']
})


export class AddUserComponent implements OnInit {
  LoggedInUser: any;
  ID: any;
  ProfileForm!: FormGroup;
  Userrole: any;
  errorMessage: any;
  constructor(
    private f: FormBuilder,
    private userAuthService: UserauthService,
    private route: ActivatedRoute,
    private router: Router,
    private FarmerService: FarmerService,
    private DealerService: DealerService
  ) { }

  ngOnInit() {
    this.LoggedInUser = this.userAuthService.isLoggedIn();
    this.route.paramMap.subscribe((params: ParamMap) => { this.ID = <any>params.get('id'); });
    // if (this.LoggedInUser == true) {
     
    //   this.User = this.userAuthService.getUser();
    //   if (this.ID != this.User.id) { alert("You are not authorized to view this page"); this.router.navigate(['/Home']); }
    //   this.Userrole = this.userAuthService.getRoles().split('_')[1];
    //   this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
    //   if (this.Userrole == 'Farmer') {
    //     this.FarmerService.getFarmer(this.User.id).subscribe(
    //       data => { this.Profile = data; this.patch(); },
    //       error => { this.errorMessage = error; console.log(this.errorMessage); });
    //     this.ProfileForm = this.f.group({
    //       id: [{ value: '', disabled: true }, Validators.required],
    //       firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    //       lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    //       password: ['', Validators.required],
    //       dob: ['', Validators.required],
    //       email: ['', [Validators.required, Validators.email]],
    //       mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    //       address: ['', Validators.required],
    //       paymentInfo: ['', Validators.required],
    //       status: ['', Validators.required]
    //     });
    //   }
    //   else if (this.Userrole == 'Dealer') {
    //     this.DealerService.getDealer(this.User.id).subscribe(
    //       data => { this.Profile = data; this.patch(); console.log(this.Profile); },
    //       error => { this.errorMessage = error; console.log(this.errorMessage); });
    //     this.ProfileForm = this.f.group({
    //       id: [{ value: '', disabled: true }, Validators.required],
    //       firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    //       lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
    //       password: ['', Validators.required],
    //       dob: ['', Validators.required],
    //       email: ['', [Validators.required, Validators.email]],
    //       mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    //       address: ['', Validators.required],
    //       paymentInfo: ['', Validators.required],
    //       status: ['', Validators.required],
    //       Addons: ['']
    //     });
    //   }
    // }
    // else {
    //   Swal.fire('You Are already Logged In', '', 'error');
    //   this.router.navigate(['/login']);
    }
  // }
  // get status() { return this.ProfileForm.get('status'); }
  // get password() { return this.ProfileForm.get('password'); }
  // get id() { return this.ProfileForm.get('id'); }
  // get firstName() { return this.ProfileForm.get('firstName'); }
  // get lastName() { return this.ProfileForm.get('lastName'); }
  // get email() { return this.ProfileForm.get('email'); }
  // get mobileNumber() { return this.ProfileForm.get('mobileNumber'); }
  // get address() { return this.ProfileForm.get('address'); }
  // get dob() { return this.ProfileForm.get('dob'); }
  // get paymentInfo() { return this.ProfileForm.get('paymentInfo'); }
  
  // UpdateProfile(ProfileForm: any) {
  //   if (confirm('Are you sure you want to update ?')) {
  //     if (this.Userrole == 'Farmer') {
  //       this.Profile = this.ProfileForm.value;
  //       this.Profile.id = this.User.id;
  //       this.FarmerService.updateFarmer(this.Profile).subscribe(
  //         data => {
  //           this.Profile = data; this.patch();
  //           alert('Profile Updated Successfully');
  //         },
  //         error => { this.errorMessage = error; console.log(this.errorMessage); });
  //     }
  //     else if (this.Userrole == 'Dealer') {
  //       this.Profile = this.ProfileForm.value;
  //       this.Profile.id = this.User.id;
  //       this.DealerService.updateDealer(this.Profile).subscribe(
  //         data => {
  //           this.Profile = data; this.patch();
  //           alert('Profile Updated Successfully');
  //         }, error => { this.errorMessage = error; console.log(this.errorMessage); });
  //     }
  //     else {
  //       alert('Profile not updated');
  //     }
  //   }
  // }

}



