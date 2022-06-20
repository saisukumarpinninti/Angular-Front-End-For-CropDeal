import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CropServiceService } from '../../services/CropService.service';
import { MatPaginator } from '@angular/material/paginator';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-CropsComponent',
  templateUrl: './CropsComponent.component.html',
  styleUrls: ['./CropsComponent.component.scss']
})
export class CropsComponentComponent implements OnInit {
  public crops: any = [];
  public  orginalcrop: any = [];
  public clicked = true;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent!: PageEvent;
  length = 0;
  // @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _cropservice: CropServiceService, private _Router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this._cropservice.getCrops().subscribe(data => {this.crops = data;
      this.orginalcrop=this.crops;
      this.length = this.orginalcrop.length;
      this.crops=this.crops.slice(0,this.pageSize);
    },
      error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  onPageChanged(e:any) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.crops = this.orginalcrop.slice(firstCut, secondCut);
  }
  reset() {
    this.crops = this.orginalcrop;
    this.length = this.orginalcrop.length;
  }
  filter(value: any) {
    // console.log(value);
    if (value && value.trim() !== '') {
      this.crops = this.crops.filter((item: any) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
      this.length = this.crops.length;
    }
      if (this.crops.length == 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No crop found!',
          timer: 5000
      });
      this.crops = this.orginalcrop;
      this.length=this.orginalcrop.length;
    }
    }
    
  
  
 
  // sort(value:any){
  //   console.log(value);
  //   if(value=='name'){
  //     this.crops.sort((a:any,b:any)=>{
  //       if(a.name<b.name){
  //         return -1;
  //       }
  //       if(a.name>b.name){
  //         return 1;
  //       }
  //       return 0;
  //     }
  //     );
      
  //   }
  //   if(value=='price'){
  //     this.crops.sort((a:any,b:any)=>{
  //       if(a.price<b.price){
  //         return -1;
  //       }
  //       if(a.price>b.price){
  //         return 1;
  //       }
  //       return 0;
  //     }
  //     );
  //   }
  // }
  
}
