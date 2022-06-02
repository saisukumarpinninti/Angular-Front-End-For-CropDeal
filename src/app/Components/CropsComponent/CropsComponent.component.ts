import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CropServiceService } from '../../_service/CropService.service';
@Component({
  selector: 'app-CropsComponent',
  templateUrl: './CropsComponent.component.html',
  styleUrls: ['./CropsComponent.component.scss']
})
export class CropsComponentComponent implements OnInit {
  public crops: any = [];
  public clicked = true;
  constructor(private _cropservice: CropServiceService, private _Router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this._cropservice.getCrops().subscribe(data => this.crops = data,
      error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  }

}