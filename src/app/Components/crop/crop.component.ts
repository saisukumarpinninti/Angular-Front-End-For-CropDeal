import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CropServiceService } from '../../_service/CropService.service';
import { UserauthService } from '../../_service/userauth.service';
import { FarmerService } from '../../_service/Farmer.service';
import Swal from 'sweetalert2';
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
  constructor(
    private route: ActivatedRoute,
    private r: Router,
    private _cropservice: CropServiceService,
    private userAuthService: UserauthService,
    private router: Router,
    private FarmerService: FarmerService
  ) { }

  ngOnInit() {
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
}

