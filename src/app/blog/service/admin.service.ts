import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AdminService {

  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;


  constructor(private afDB:AngularFireDatabase,private afStorage:AngularFireStorage,
    private http:HttpClient,private afAuth:AngularFireAuth) {
  }

  getBolgs(){
    return this.afDB.list('blogs');
  }

  blog(id){
    return this.afDB.object(`blogs/${id}`);
  }

  addBlog(value){
    value["date"] = new Date().toString();
    return this.afDB.list("blogs").push(value);
  }

  get authData():Observable<User>{
    return this.afAuth.authState;
  }

  uploadImages(files:FileList):Promise<any>{

    let promise = new Promise((resolve,reject)=>{
      let file = new FileReader();
      file.onload = (e)=>{
        resolve(e.srcElement["result"]);
      }
      file.readAsDataURL(files.item(0));
    })
    return promise;

    // let promise = new Promise((resove,reject)=>{
    //   let ref = this.afStorage.ref(files.item(0).name);
    //   let task = ref.put(files.item(0));
    //   this.percentage = task.percentageChanges();
    //   let value = this.percentage.toPromise().then(e=>{return e});
    //   value.then(e=>{
    //     if(e == 100){
    //       resove(ref.getDownloadURL().toPromise())
    //     }
    //   })
    // })
    // return promise;
  }

  getDataDB(){
    return this.afDB.list('blogs').valueChanges();
  }

  fetchCategoryData(){
    let categories = new Promise((resolve,reject)=>{
      this.afDB.list('category').valueChanges().subscribe(data=>{
        resolve(data);
      },err=>reject(err));
    });
    return categories;
  }

  addChips(chips){
    this.afDB.object("category/chips").set(chips)
  }

  deleteImage(){

  }
  
}
