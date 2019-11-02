import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from '../../service/blog.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {

 // items = values.question;
 items:Observable<any>;
 constructor(private blogService:BlogService) { 
   this.items = this.blogService.getBlogs.snapshotChanges().pipe(
     map(blogs=>{
       return blogs.map(blog=>{
         return {key :blog.key,...blog.payload.val()};
       })
     })
   )
 }

 ngOnInit() {
 }

 deleteBlog(key){
   if(confirm("are you sure")){
     this.blogService.getBlog(key).remove();
     this.blogService.getPageViews(key).remove();
     this.blogService.getLikes(key).remove();
   }
 }

}
