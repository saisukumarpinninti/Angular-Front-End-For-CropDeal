import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { CropServiceService } from './CropsComponent/CropService.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [						
    AppComponent,
    routedComponents
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CropServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
