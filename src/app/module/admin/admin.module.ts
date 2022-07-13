import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { AdminRoutingModule } from './admin-routing.module';

import {FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrandComponent } from './components/brand/brand.component';
import { CategoryComponent } from './components/category/category.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    BrandComponent,
    CategoryComponent,
    ProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule { }
