import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent, canActivate:[AuthGuard]},
  {path:"home",component:HomeComponent, canActivate:[AuthGuard]},
  {path:"product",component:ProductsComponent},
  {path:"customer",component:CustomersComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
