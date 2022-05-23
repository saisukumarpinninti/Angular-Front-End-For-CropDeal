import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute,ParamMap} from '@angular/router';
import { CropServiceService } from '../CropsComponent/CropService.service';
@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit {

  constructor(private route:ActivatedRoute,private r :Router,private _cropservice:CropServiceService) { }
  public crop:any;

  public _cropid: any ;
  ngOnInit() {
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this._cropid = parseInt(<any>params.get('id'));})
    this._cropservice.getCrop(this._cropid).subscribe((data: any)=>{
      this.crop=data,
      ( error: any)=>console.log(error)
    });
  }

}
