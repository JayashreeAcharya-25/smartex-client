import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HomeComponent } from './components/home/home.component';
import { BrandComponent } from './components/brand/brand.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';
import { StockComponent } from './components/stock/stock.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path:'', redirectTo: '/admin/home', pathMatch:'full'},
      { path:'home', component: HomeComponent, canActivate: [AuthGuard]},
      { path:'brand', component: BrandComponent},
      { path:'category', component: CategoryComponent},
      { path:'product', component: ProductComponent},
      { path:'stocks', component: StockComponent},
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
