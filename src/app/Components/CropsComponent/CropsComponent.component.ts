import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CropServiceService } from '../../services/CropService.service';
@Component({
  selector: 'app-CropsComponent',
  templateUrl: './CropsComponent.component.html',
  styleUrls: ['./CropsComponent.component.scss']
})
export class CropsComponentComponent implements OnInit {
  public crops: any = [];
  public  orginalcrop: any = [];
  public clicked = true;
  constructor(private _cropservice: CropServiceService, private _Router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this._cropservice.getCrops().subscribe(data => {this.crops = data;
      this.orginalcrop=this.crops;},
      error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  }

  reset() {
    this.crops = this.orginalcrop;
  }
  filter(value: any) {
    // console.log(value);
    if (value && value.trim() !== '') {
      this.crops = this.crops.filter((item: any) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      if (this.crops.length == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No crop found!',
          timer: 5000
      });
      this.crops = this.orginalcrop;
    }
    }
  }
}