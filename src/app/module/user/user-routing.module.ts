import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
    {
      path: '',
      component: UserComponent,
      children: [
        { path:'', redirectTo: 'home', pathMatch:'full'},
        { path:'home', component: IndexComponent},
        { path:'signup', component: SignupComponent},
        { path:'login', component: LoginComponent},
        { path:'product', component: ProductsComponent},
        { path:'yourcart', component: CartComponent},
      ]
    }
    
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }