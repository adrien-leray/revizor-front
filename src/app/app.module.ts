import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CourseSheetListComponent } from './shared/components/course-sheet-list/course-sheet-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarketPlaceComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CourseSheetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
