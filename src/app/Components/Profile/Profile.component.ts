import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserauthService } from '../../_service/userauth.service';
import { FarmerService } from '../../_service/Farmer.service';
import { DealerService } from '../../_service/Dealer.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-Profile',
  templateUrl: './ProfileComponent.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {
  LoggedInUser: any;
  ID: any;
  ProfileForm!: FormGroup;
  userForm!: FormGroup;
  Profile: any;
  User: any;
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
    if (this.LoggedInUser == true) {
      this.route.paramMap.subscribe((params: ParamMap) => { this.ID = <any>params.get('id'); });
      this.User = this.userAuthService.getUser();
      if (this.ID != this.User.id) { Swal.fire("You are not authorized to view this page"); this.router.navigate(['/Home']); }
      this.Userrole = this.userAuthService.getRoles().split('_')[1];
      this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
      if (this.Userrole == 'Farmer') {
        this.FarmerService.getFarmer(this.User.id).subscribe(
          data => { this.Profile = data; this.patch(); },
          error => { this.errorMessage = error; console.log(this.errorMessage); });
        this.ProfileForm = this.f.group({
          id: [{ value: '', disabled: true }, Validators.required],
          firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
          lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
          password: ['', Validators.required],
          dob: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          address: ['', Validators.required],
          paymentInfo: ['', Validators.required],
          status: [true, Validators.required]
        });
      }
      else if (this.Userrole == 'Dealer') {
        this.DealerService.getDealer(this.User.id).subscribe(
          data => { this.Profile = data; this.patch(); console.log(this.Profile); },
          error => { this.errorMessage = error; console.log(this.errorMessage); });
        this.ProfileForm = this.f.group({
          id: [{ value: '', disabled: true }, Validators.required],
          firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
          lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
          password: ['', Validators.required],
          dob: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          address: ['', Validators.required],
          paymentInfo: ['', Validators.required],
          status: [true, Validators.required],
          Addons: ['']
        });
      }
    }
    else {
      Swal.fire('Please Login');
      this.router.navigate(['/login']);
    }
  }
  get status() { return this.ProfileForm.get('status'); }
  get password() { return this.ProfileForm.get('password'); }
  get id() { return this.ProfileForm.get('id'); }
  get firstName() { return this.ProfileForm.get('firstName'); }
  get lastName() { return this.ProfileForm.get('lastName'); }
  get email() { return this.ProfileForm.get('email'); }
  get mobileNumber() { return this.ProfileForm.get('mobileNumber'); }
  get address() { return this.ProfileForm.get('address'); }
  get dob() { return this.ProfileForm.get('dob'); }
  get paymentInfo() { return this.ProfileForm.get('paymentInfo'); }
  patch() {
    if (this.Userrole == 'Farmer') {
      this.ProfileForm.patchValue({
        id: this.Profile.id,
        firstName: this.Profile.firstName,
        lastName: this.Profile.lastName,
        email: this.Profile.email,
        mobileNumber: this.Profile.mobileNumber,
        address: this.Profile.address,
        dob: this.Profile.dob,
        paymentInfo: this.Profile.paymentInfo,
        status: this.Profile.status,
      });
    }
    else if (this.Userrole == 'Dealer') {
      this.ProfileForm.patchValue({
        id: this.Profile.id,
        firstName: this.Profile.firstName,
        lastName: this.Profile.lastName,
        email: this.Profile.email,
        mobileNumber: this.Profile.mobileNumber,
        address: this.Profile.address,
        dob: this.Profile.dob,
        paymentInfo: this.Profile.paymentInfo,
        status: this.Profile.status,
        Addons: this.Profile.Addons
      });
    }
  }
  DeleteProfile() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon : 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'})
   .then((result) => {
      if (result.value) {
        if (this.Userrole == 'Farmer') {
          this.FarmerService.deleteFarmer(this.Profile.id);
          Swal.fire('Deleted!','Your Profile has been deleted.','success');
          this.router.navigate(['/Home']);
    }
        }
        else if (this.Userrole == 'Dealer') {
          this.DealerService.deleteDealer(this.Profile.id);
              Swal.fire('Deleted!','Your Profile has been deleted.','success');
              this.router.navigate(['/Home']);
        }
      });
  }
    

  UpdateProfile(ProfileForm: any) {
    if (confirm('Are you sure you want to update ?')) {
      if (this.Userrole == 'Farmer') {
        this.Profile = this.ProfileForm.value;
        this.Profile.id = this.User.id;
        this.FarmerService.updateFarmer(this.Profile).subscribe(
          data => {
            this.Profile = data; this.patch();
            Swal.fire('Profile Updated Successfully');
          },
          error => {
            this.errorMessage = error;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
            console.log(this.errorMessage);
          });
      }
      else if (this.Userrole == 'Dealer') {
        this.Profile = this.ProfileForm.value;
        this.Profile.id = this.User.id;
        this.DealerService.updateDealer(this.Profile).subscribe(
          data => {
            this.Profile = data; this.patch();
            Swal.fire('Profile Updated Successfully');
          }, error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
            this.errorMessage = error; console.log(this.errorMessage);
          });
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Profile Not Updated !',
        })
      }
    }
  }

}



