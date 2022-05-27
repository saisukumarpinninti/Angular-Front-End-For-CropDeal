import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute,ParamMap} from '@angular/router';
import { CropServiceService } from '../_service/CropService.service';
import { UserauthService } from '../_service/userauth.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-FarmerCrops',
  templateUrl: './FarmerCrops.component.html',
  styleUrls: ['./FarmerCrops.component.scss']
})
export class FarmerCropsComponent implements OnInit {

  isLoggedIn!: boolean;
  Userrole:any;
  currentcrops=true;
  farmercheck=false;
  LoggedInUser: any;
  CropForm:any;
  Crops:any;
  Crop:any;
  errorMessage: any;
  display = "none";
  constructor(
    private route:ActivatedRoute,
    private r :Router,
    private _cropservice:CropServiceService,
    private userAuthService: UserauthService,
    private f : FormBuilder,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.userAuthService.isLoggedIn();
    if (this.isLoggedIn == true) {
    this.LoggedInUser = this.userAuthService.getUser();
    this.Userrole = this.userAuthService.getRoles().split('_')[1];
    this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
    if(this.Userrole=="Farmer"){
      this.farmercheck=true;
      this._cropservice.getFarmerCrops(this.LoggedInUser.id).subscribe(
        data => { this.Crops = data;  },
        error => { this.errorMessage = error; console.log(this.errorMessage); });
      this.CropForm = this.f.group({
        id: [{ value: '', disabled: true }],
        farmerid: [this.LoggedInUser.id, Validators.required],
        name: ['', [Validators.required, Validators.pattern('^[A-Za-z]+$')]],
        cost: ['', Validators.required, Validators.pattern('^[0-9]+$')],
        Quantity: ['', Validators.required, Validators.pattern('^[0-9]+$')],
        type: ['', Validators.required],
        Active: [true, Validators.required],});
    }
    else{
      this.farmercheck=false;
      alert("You are not a farmer");
      this.r.navigate(['/Home']);
    }
  }
  else{
    alert("You are not logged in");
    this.r.navigate(['/Home']);
  }
  }
  LoadCrop(id:any){
    this.Crops.forEach((element:  any ) => {
      if(element.id==id){
        this.Crop=element;
      }});}

  UpdateCrop(id:any){
    // this.display = "block";
    this.LoadCrop(id);
    console.log(this.Crop);
    // this.CropForm.controls['id'].setValue(this.Crop.id);
    // this.CropForm.controls['name'].setValue(this.Crop.name);
    // this.CropForm.controls['cost'].setValue(this.Crop.cost);
    // this.CropForm.controls['Quantity'].setValue(this.Crop.Quantity);
    // this.CropForm.controls['type'].setValue(this.Crop.type);
    // this.CropForm.controls['Active'].setValue(this.Crop.Active);
    // this.currentcrops=false;
  }
  AddCrop(){  
    this.CropForm.patchValue({
      id: '',
      farmerid: this.LoggedInUser.id,
      name: '',
      cost: '',
      Quantity: '',
      type: '',
      Active: true,
    });}
  onSubmit(CropForm:any){
    if(CropForm.valid){
      this._cropservice.addCrop(CropForm.value).subscribe(
        data => { this.Crops = data; console.log(this.Crops); },
        error => { this.errorMessage = error; console.log(this.errorMessage); });
      this.CropForm.reset();
      this.currentcrops=true;
    }
    else{
      alert("Please fill the form correctly");
    }
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
