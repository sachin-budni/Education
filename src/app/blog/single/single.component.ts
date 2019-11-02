import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../service/blog.service';
// import { AuthService } from 'src/app/core/auth.service';
import { User } from 'firebase';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  $key:string;
  socialMedia:any[] = [];
  currentUserUid:string;
  authState:Observable<User>;
  blogObservable:Observable<any>;
  pageView;
  likes:Observable<any>;
  constructor(private route:ActivatedRoute,private blogService:BlogService) {
    this.socialMedia = this.blogService.getSocialMedia;
    this.route.params.subscribe(routes=>{
      this.$key = routes.id;
      // this.authState = this.authService.getAuthState;
      // this.authState.pipe(first()).toPromise().then(user=>{
      //   this.currentUserUid = user.uid;
      // }).catch(err=>console.log(err))

      this.blogService.getByTitle(this.$key).snapshotChanges().subscribe(d=>{
        if(d){
          this.blogService.setTitle(this.$key);
        }
        this.blogObservable = this.blogService.getBlog(d[0]["key"]).snapshotChanges().pipe(
          map(blogs=>{
            return {key:blogs.key,...blogs.payload.val()}
          })
        )
      })

      this.pageViews(routes.id).then(view=>{
        this.pageView = view?view + 1:1;
        this.blogService.getPageViews(routes.id).set(this.pageView);
        this.likes = this.getLikes(routes.id);
      });

    })
  }

  ngOnInit() {
  }

  getLikes(id){
    return this.blogService.getLikes(id).snapshotChanges().pipe(
      map(d=>{
        if(!d.payload.val()) return 0;
        return {count:Object.keys(d.payload.val()).length,...d.payload.val()}
      })
    );
  }

  async pageViews(id):Promise<any>{
    return await (this.blogService.getPageViews(id).valueChanges().pipe(first()).toPromise());
  }

  updateLike(){
    this.blogService.updateLikes(this.$key);
  }

  openLink(link){
    window.open(link,'_blank',"toolbar=yes,top=500,left=500,width=400,height=400")
  }

}
