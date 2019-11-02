import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';
import { map, startWith, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  tags:Observable<any>;
  recentlyPosts:Observable<any>;
  searchFormGroup:FormGroup;
  paload:any[];

  constructor(private blogService:BlogService,private fb:FormBuilder,private router:Router) {
    this.searchFormGroup = this.fb.group({
      search:['',[Validators.required,Validators.minLength(1)]]
    })
    this.tags =this.blogService.getCategories.snapshotChanges().pipe(
      map(tags=>{
        return tags.payload.val();
      })
    );

    this.recentlyPosts = this.blogService.getRecentlyPosts.snapshotChanges().pipe(
      map(posts=>{
        return posts.map(post=>{
          return { key:post.key,...post.payload.val() };
        })
      })
    )
  }

  ngOnInit() {
    this.searchFormGroup.get('search').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    ).subscribe(data=>{
      data.subscribe()
    });
  }
  private _filter(value: string) {
    return this.blogService.blogSearch(value).snapshotChanges()
    .pipe(
      map(blogs=>{
        this.paload = blogs.map(b=>{
          return {key:b.key,...b.payload.val()}
        });
      })
    );
  }
  displayFn(book?): string | undefined {
    return book ? book.title : undefined;
  }
  searchBlog(value){
    this.router.navigate(["/blog",value.search.key])
    this.searchFormGroup.reset();
  }
}
