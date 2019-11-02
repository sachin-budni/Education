import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  blogs:Observable<any>;
  constructor(private route:ActivatedRoute,private blogService:BlogService) {
    this.route.params.subscribe(routes=>{
      let id = routes.id;
      this.getCategoryBlogs(id);
    })
  }

  ngOnInit() {
  }

  shareBlog(Url,title){
    let shareURL = "https://www.willntrix.com/blog/"+encodeURI(title);
    window.open(Url+shareURL,'_blank',"toolbar=yes,top=500,left=500,width=400,height=400")
  }

  getCategoryBlogs(chipName){
    this.blogs = this.blogService.getCategoryWiseBlogs(chipName);
  }
}
