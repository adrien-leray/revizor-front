import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { HomeComponent } from './home/home.component';
import { SheetEditorComponent } from './sheet-editor/sheet-editor.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children : [
      { path: 'market', component: MarketPlaceComponent },
      { path: 'editor', component: SheetEditorComponent },
      { path: 'transaction', component: TransactionListComponent },
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
