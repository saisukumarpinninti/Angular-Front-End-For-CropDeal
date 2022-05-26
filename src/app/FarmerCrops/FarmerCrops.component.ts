import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute,ParamMap} from '@angular/router';
import { CropServiceService } from '../_service/CropService.service';
import { UserauthService } from '../_service/userauth.service';
import { FarmerService } from '../_service/Farmer.service';
@Component({
  selector: 'app-FarmerCrops',
  templateUrl: './FarmerCrops.component.html',
  styleUrls: ['./FarmerCrops.component.scss']
})
export class FarmerCropsComponent implements OnInit {


  Userrole:any;
  farmercheck=false;
  LoggedInUser: any;
  Crops:any;
  errorMessage: any;
  constructor(
    private route:ActivatedRoute,
    private r :Router,
    private _cropservice:CropServiceService,
    private userAuthService: UserauthService,
    private router: Router,
    private FarmerService: FarmerService
  ) { }

  ngOnInit() {
    this.LoggedInUser = this.userAuthService.getUser();
    this.Userrole = this.userAuthService.getRoles().split('_')[1];
    this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
    if(this.Userrole=="Farmer"){
      this.farmercheck=true;
      this._cropservice.getFarmerCrops(this.LoggedInUser.id).subscribe(
        data => { this.Crops = data; console.log(this.Crops); },
        error => { this.errorMessage = error; console.log(this.errorMessage); });
    }
    else{
      this.farmercheck=false;
      alert("You are not a farmer");
      this.r.navigate(['/home']);
    }
    
  }

}
