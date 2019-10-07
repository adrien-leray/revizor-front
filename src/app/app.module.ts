import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FileListComponent } from './shared/components/file-list/file-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MarketPlaceComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    FileListComponent
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
