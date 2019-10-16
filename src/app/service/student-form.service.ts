import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class StudentFormService {

  constructor(private afStorage:AngularFireStorage,private database:AngularFireDatabase) { }

  private basePath:string = '/uploads';

  fileUpload(file:File,path:string){

    const customMetadata = { app: 'Education' };

    return this.afStorage.upload(path, file, { customMetadata })
  }
  fileRef(path){
    return this.afStorage.ref(path);
  }
  
  postStudentDetails(value){
    this.database.list("studentDetals").push(value);
  }

  getFilepath(file:File,randomNumber:string){
    return `${this.basePath}/${randomNumber}/${file.name}`;
  }
}
