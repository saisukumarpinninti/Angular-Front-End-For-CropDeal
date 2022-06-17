import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  v='';
  t = new Date();
  n = this.t.getHours();
  ngOnInit() {
    var v = "welcome";
    if(this.n<4){
       this.v = "Night  Owl";   
    }
    if( this.n > 4 && this.n <= 11){
      this.v = "Good Morning"; 
    }
    if( this.n > 11 && this.n <= 15){
      this.v = "Good AfterNoon"; 
    }
    if( this.n >15 && this.n <= 21){
      this.v =  "Good Evening";
    }
    if( this.n >21 && this.n <= 24){
      this.v =  "Good Evening";
    }
    return v;
  }


}
