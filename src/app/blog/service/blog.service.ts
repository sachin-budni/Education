import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class BlogService {

  constructor(private afAuth:AngularFireAuth,private afDb:AngularFireDatabase,private title:Title,
              private meta:Meta) { }

  setTitle(title:string){
    this.title.setTitle(title);
  }

  addTags(name,content){
    this.meta.addTag({name:name,content:content});
  }

  get getBlogs(){
    return this.afDb.list('blogs',ref=>ref.limitToFirst(20));
  }
  get getCategories(){
    return this.afDb.object('category/chips')
  }

  get getRecentlyPosts(){
    return this.afDb.list('blogs',ref=>ref.limitToLast(3));
  }

  getByTitle(title:string){
    return this.afDb.list('blogs',ref=>ref.orderByChild("title").equalTo(title));
  }

  getBlog(title:string){
    return this.afDb.object(`blogs/${title}`);
  }
  getPageViews(id){
    return this.afDb.object(`views/${id}`);
  }

  getLikes(blogId){
    return this.afDb.object(`likes/${blogId}`);
  }

  getCategoryWiseBlogs(chipName){
    return this.afDb.list('blogs').snapshotChanges().pipe(
      map(d=>{
        let blogs =  d.filter(b=>{
          let payload = b.payload.val();
            if(payload && payload["category"].includes(chipName)){
              return {key:b.key,...payload}
            }
        })
        return blogs.map(b=>{return {key:b.key,...b.payload.val()}});
      })
    );
  }
  get getSocialMedia(){
    let socialShare = [
      {
        name:"facebook",
        link:`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${window.location.href}`
      },
      {
        name:"whatsapp",
        link:`https://wa.me/?text=${window.location.href}`
      },
      {
        name:"twitter",
        link:`https://twitter.com/share?url=${window.location.href}`
      }
    ]
    return socialShare;
  }

  updateLikes(id){
    let data = {};
    if(this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.uid){
      data[this.afAuth.auth.currentUser.uid] = true
    }else{
      // data[this.uuidv4] = true;
      alert("Please Login")
    }
    return this.afDb.object(`likes/${id}`).update(data)
  }

  blogSearch(start){
    if(start && typeof start == "object"){
      start = start.title
    };
    return this.afDb.list('/blogs',ref=>ref.orderByChild('title').limitToFirst(10).startAt(start).endAt(start+"\uf8ff"));
  }

}
