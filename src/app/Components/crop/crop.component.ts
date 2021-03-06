import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CropServiceService } from '../../services/CropService.service';
import { UserauthService } from '../../services/userauth.service';
import { FarmerService } from '../../services/Farmer.service';
import { PaymentService } from '../../services/Payment.service';
import Swal from 'sweetalert2';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {
  errorMessage: any;
  farmercheck = false;
  Farmer: any;
  crop: any;
  LoggedInUser: any;
  _cropid: any;
  user: any;
  Purchased:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private r: Router,
    private _cropservice: CropServiceService,
    private userAuthService: UserauthService,
    private router: Router,
    private FarmerService: FarmerService,
    private PaymentService: PaymentService,
    private httpclient: HttpClient
  ) { }



  ngOnInit() {
    this.user = this.userAuthService.getUser();
    console.log(this.user);
    this.LoggedInUser = this.userAuthService.isLoggedIn();
    if (this.LoggedInUser == true) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        this._cropid = parseInt(<any>params.get('id'));
      })
      this._cropservice.getCrop(this._cropid).subscribe((data: any) => {
        this.crop = data,
          (error: any) => console.log(error)
      });
    }
    else {
      Swal.fire('Please Login');
      this.router.navigate(['/crops']);
    }
  }

  loadfarmer() {
    this.farmercheck = true;
    this.Farmer = this.FarmerService.getFarmer(this.crop.farmerid).subscribe(
      data => { this.Farmer = data; console.log(this.Farmer); },
      error => { this.errorMessage = error; console.log(this.errorMessage); });
  }
  purchase(id: string,cropcost: any,dealerid: string) {
    
    window.open ( 'http://localhost:9069/'+'submitPaymentDetail?CUST_ID='+dealerid+'&TXN_AMOUNT='+cropcost+'&CropId='+id,
     '_blank')?.focus();
  
  }



}

