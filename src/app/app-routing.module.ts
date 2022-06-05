import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/Home.component';
import { CropsComponentComponent } from './Components/CropsComponent/CropsComponent.component';
import { NavBarComponent } from './Components/NavBar/NavBar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CropComponent } from './Components/crop/crop.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/Profile/Profile.component';
import { FarmerCropsComponent } from './Components/FarmerCrops/FarmerCrops.component';
import { AddUserComponent } from './Components/addUser/addUser.component';
import { AdminComponent } from './Components/Admin/Admin.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'Home' },
  { path: 'crops', component: CropsComponentComponent },
  { path: 'crop/:id', component: CropComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Profile/:id', component: ProfileComponent },
  { path: 'sell', component: FarmerCropsComponent },
  { path: 'addUser/:role', component: AddUserComponent },
  { path: 'Admin', component: AdminComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [HomeComponent, CropsComponentComponent, NavBarComponent, FooterComponent,
  CropComponent, LoginComponent, ProfileComponent, FarmerCropsComponent, AddUserComponent, AdminComponent];