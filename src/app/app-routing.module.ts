import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"",loadChildren:()=>import('./blog/blog.module').then(m=>m.BlogModule)},
  // {path:"blog/:id",component:BlogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
