import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/User.service';
import { UserauthService } from '../../services/userauth.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmerService } from 'src/app/services/Farmer.service';
import { DealerService } from 'src/app/services/Dealer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CropServiceService } from 'src/app/services/CropService.service';
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
  Farmers: any;
  Crops: any;
  Dealer: Boolean = false;
  Crop: Boolean = false;
  FarmersdisplayedColumns: string[] = ['id', 'firstName', 'lastName',
    'mobileNumber', 'email', 'address', 'status'];
  datasoucre: any;
  Dealers: any;
  DealersdisplayedColumns: string[] = ['id', 'firstName', 'lastName',
    'mobileNumber', 'email', 'address', 'status', 'addons'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  Farmer: boolean = false;
  CropsdisplayedColumns: string[] = ['id', 'name', 'farmerid', 'cost', 'quantity', 'type', 'Active'];

  constructor(private f: FormBuilder,
    private Cropservice: CropServiceService,
    private userService: UserService,
    private userAuthService: UserauthService,
    private router: Router,
    private farmerService: FarmerService,
    private dealerService: DealerService) { }


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
        // this.LoadFarmers();
        
      }
      else {
        Swal.fire('You are not an Admin', '', 'error');
        this.router.navigate(['/Home']);
      }
    }
    else if (this.submitted == false) {
      // Swal.fire('You are not LoggedIn', '', 'error');
      this.loginForm = this.f.group({
        username: ['', [Validators.required, Validators.pattern('^[1-9]*$')]],
        password: ['', [Validators.required]]
      });
    }
  }
  LoadDealers() {
    this.datasoucre = null;
    this.Farmer = false;
    this.Crop = false;
    this.Dealer = true;
    this.dealerService.getAllDealer().subscribe(
      (response: any) => {
        console.log(response);
        this.Dealers = response;
        this.datasoucre = new MatTableDataSource(this.Dealers);
        this.datasoucre.sort = this.sort;
        this.datasoucre.paginator = this.paginator;
      },
      (error) => {
        this.errorMessage = error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please Try Again',
        });
        console.log(error);
      }
    );
  }
  LoadCrop() {
    this.datasoucre = null;
    this.Dealer = false;
    this.Crop = true;
    this.Farmer = false;
    this.Cropservice.getAllCrops().subscribe((data: any) => {
      this.Crops = data;
      console.log(this.Crops);
      this.datasoucre = new MatTableDataSource(this.Crops);
      this.datasoucre.sort = this.sort;
      this.datasoucre.paginator = this.paginator;
    },
      (error) => {
        this.errorMessage = error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please Try Again, If problem persists contact Admin error ' + error.message,
        });
        console.log(error);
      });
  }
  LoadFarmers() {
    this.datasoucre = null;
    this.Dealer = false;
    this.Crop = false;
    this.Farmer = true;
    this.farmerService.getAllFarmer().subscribe((data: any) => {
      this.Farmers = data;
      console.log(this.Farmers);
      this.datasoucre = new MatTableDataSource(this.Farmers);
      this.datasoucre.sort = this.sort;
      this.datasoucre.paginator = this.paginator;
    },
      (error) => {
        this.errorMessage = error;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please Try Again, If problem persists contact Admin error ' + error.message,
        });
        console.log(error);
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasoucre.filter = filterValue.trim().toLowerCase();
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
        this.errorMessage = error.message;
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please Try Again'+error.message,
        });
      }
    );
  }

}
