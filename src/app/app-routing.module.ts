import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './module/user/home/home.component';

const routes: Routes = [
  {
    path:'admin', 
    loadChildren: () => 
    import('./module/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path:'', 
    loadChildren: () => 
    import('./module/user/user.module').then((m) => m.UserModule)
  },
  
  // { path:'', component: HomeComponent},
  
];

// { path:'', 
// component: HomeComponent, 
// children: [
//   { path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
//   { path:'home', component: HomeComponent},
//   { path:'category', component: CategoryComponent}
// ]},

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
