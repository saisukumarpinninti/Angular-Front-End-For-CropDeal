import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserauthService } from '../../_service/userauth.service';
import { FarmerService } from '../../_service/Farmer.service';
import { DealerService } from '../../_service/Dealer.service';
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
    this.route.paramMap.subscribe((params: ParamMap) => { this.Userrole = <any>params.get('role'); });
    if (this.LoggedInUser == true) {
      Swal.fire('You Are already Logged In', '', 'error');
      this.router.navigate(['/Home']);
    }
    else if (this.LoggedInUser == false && this.Userrole == 'Farmer') {
      this.ProfileForm = this.f.group({
        id: ['0', Validators.required],
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
    else if (this.LoggedInUser == false && this.Userrole == 'Dealer') {
      this.ProfileForm = this.f.group({
        id: ['0', Validators.required],
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
    else {
      Swal.fire('Invalid Url', '', 'error');
      this.router.navigate(['/Home']);
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

  addProfile(ProfileForm: any) {
    if (this.Userrole == 'Farmer') {
      console.log(ProfileForm.value);
      this.FarmerService.addFarmer(this.ProfileForm.value).subscribe(
        data => {
          this.ID = data;
          Swal.fire('Profile added Successfully ! Your Profile ID is ' + this.ID.id, '', 'success');
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
      this.DealerService.addDealer(this.ProfileForm.value).subscribe(
        data => {
          this.ID = data;
          Swal.fire('Profile added Successfully ! Your Profile ID is ' + this.ID.id, '', 'success');
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
        text: 'Profile Not added !',
      })
    }
  }

}



