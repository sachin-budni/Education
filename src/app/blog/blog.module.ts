import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BlogService } from './service/blog.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SingleComponent } from './single/single.component';
import { MainComponent } from './main/main.component';
import { VideoPipe } from './pipe/video.pipe';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
import { AdminService } from './service/admin.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { AdminViewComponent } from './blog-admin/admin-view/admin-view.component';
import { BlogComponent } from './blogs/blog.component';
import { MaterialModule } from '../material.module';
import { QuillModule } from 'ngx-quill';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthGuard } from '../core/auth/auth.guard';

const route :Routes = [
  { path:"blog",component:MainComponent,children:[
    { path:"",component:BlogComponent },
    { path:"admin",component:BlogAdminComponent,canActivate:[AuthGuard]},
    { path:"admin/:id",component:BlogAdminComponent,canActivate:[AuthGuard]},
    { path:"adminview",component:AdminViewComponent,canActivate:[AuthGuard]},
    { path:"category/:id",component:CategoryComponent },
    { path:":id",component:SingleComponent },
    { path:"**",redirectTo:'',pathMatch:"full"},
  ]},
] 
@NgModule({
  declarations: [BlogComponent, SingleComponent, MainComponent, VideoPipe, BlogAdminComponent, CategoryComponent, AdminViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MaterialModule,
    FlexLayoutModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  exports:[
    RouterModule
  ],
  providers:[BlogService,AdminService,AuthGuard]
})
export class BlogModule { }
