import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CropServiceService } from '../_service/CropService.service';
import { UserauthService } from '../_service/userauth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-FarmerCrops',
  templateUrl: './FarmerCrops.component.html',
  styleUrls: ['./FarmerCrops.component.scss']
})
export class FarmerCropsComponent implements OnInit {

  isLoggedIn!: boolean;
  Userrole: any;
  currentcrops = true;
  farmercheck = false;
  LoggedInUser: any;
  CropForm: any;
  Crops: any;
  Crop: any;
  errorMessage: any;
  display = "none";
  constructor(
    private route: ActivatedRoute,
    private r: Router,
    private _cropservice: CropServiceService,
    private userAuthService: UserauthService,
    private f: FormBuilder,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.userAuthService.isLoggedIn();
    if (this.isLoggedIn == true) {
      this.LoggedInUser = this.userAuthService.getUser();
      this.Userrole = this.userAuthService.getRoles().split('_')[1];
      this.Userrole = this.Userrole.substring(0, this.Userrole.length - 1);
      if (this.Userrole == "Farmer") {
        this.farmercheck = true;
        this._cropservice.getFarmerCrops(this.LoggedInUser.id).subscribe(
          data => { this.Crops = data; },
          error => {
            this.errorMessage = error; Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            }); console.log(this.errorMessage);
          });
        this.CropForm = this.f.group({
          id: [{ value: '' }],
          farmerid: [this.LoggedInUser.id, Validators.required],
          name: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
          cost: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
          quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
          type: ['', Validators.required],
          Active: [true]
        });
      }
      else {
        this.farmercheck = false;
        Swal.fire("You are not a farmer");
        this.r.navigate(['/Home']);
      }
    }
    else {
      Swal.fire("You are not logged in");
      this.r.navigate(['/Home']);
    }
  }

  LoadCrop(id: any) {
    this.Crops.forEach((element: any) => {
      if (element.id == id) {
        this.Crop = element;
      }
    });
  }

  get id(): any { return this.CropForm.get('id'); }
  get farmerid(): any { return this.CropForm.get('farmerid'); }
  get name(): any { return this.CropForm.get('name'); }
  get cost(): any { return this.CropForm.get('cost'); }
  get quantity(): any { return this.CropForm.get('quantity'); }
  get type(): any { return this.CropForm.get('type'); }
  get Active(): any { return this.CropForm.get('Active'); }

  UpdateCrop(id: any) {
    this.LoadCrop(id);
    this.CropForm.controls['id'].setValue(this.Crop.id);
    this.CropForm.controls['farmerid'].setValue(this.Crop.farmerid);
    this.CropForm.controls['name'].setValue(this.Crop.name);
    this.CropForm.controls['cost'].setValue(this.Crop.cost);
    this.CropForm.controls['quantity'].setValue(this.Crop.quantity);
    this.CropForm.controls['type'].setValue(this.Crop.type);
    this.CropForm.controls['Active'].setValue(true);
    this.openModal();
  }
  AddCrop() {
    this.CropForm.controls['id'].setValue("new");
    this.CropForm.controls['farmerid'].setValue(this.LoggedInUser.id);
    this.CropForm.controls['name'].setValue("");
    this.CropForm.controls['cost'].setValue("");
    this.CropForm.controls['quantity'].setValue("");
    this.CropForm.controls['type'].setValue("");
    this.CropForm.controls['Active'].setValue(true);
    this.openModal();
  }

  onSubmit(CropForm: any) {
    if (CropForm.value.id == "new" && (CropForm.valid)) {
      this._cropservice.addCrop(CropForm.value).subscribe(
        data => { this.Crops = data; console.log(this.Crops); },
        error => { this.errorMessage = error; console.log(this.errorMessage); });
      this.CropForm.reset();
      this.currentcrops = true;
      this.onCloseHandled();
      Swal.fire('Crop Added Successfully');
      window.location.reload();
    }

    else if (CropForm.value.id != "new" && CropForm.valid) {
      this.CropForm.controls['id'].setValue(this.Crop.id);
      this.CropForm.controls['farmerid'].setValue(this.Crop.farmerid);
      this.CropForm.controls['Active'].setValue(true);
      this._cropservice.updateCrop(CropForm.value).subscribe(
        data => { this.Crops = data; console.log(this.Crops); },
        error => { this.errorMessage = error; console.log(this.errorMessage); });
      this.CropForm.reset();
      this.currentcrops = true;
      this.onCloseHandled();
      Swal.fire('Crop Updated Successfully');
    }
    else {
      Swal.fire("Please fill the form correctly");
    }
  }
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
