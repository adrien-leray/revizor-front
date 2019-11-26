import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children : [
      { path: 'market', component: MarketPlaceComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
