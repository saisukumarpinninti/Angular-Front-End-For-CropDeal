import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { CropsComponentComponent } from './CropsComponent/CropsComponent.component';
import { NavBarComponent } from './NavBar/NavBar.component';
import { FooterComponent } from './footer/footer.component';
import { CropComponent } from './crop/crop.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './Profile/Profile.component';
import { FarmerCropsComponent } from './FarmerCrops/FarmerCrops.component';
import { AddUserComponent } from './addUser/addUser.component';
const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'Home' },
  { path: 'crops', component: CropsComponentComponent },
  { path: 'crop/:id', component: CropComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Profile/:id', component: ProfileComponent },
  { path: 'sell', component: FarmerCropsComponent },
  { path: 'addUser/:role', component: AddUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routedComponents = [HomeComponent, CropsComponentComponent, NavBarComponent, FooterComponent,
  CropComponent, LoginComponent, ProfileComponent, FarmerCropsComponent, AddUserComponent];