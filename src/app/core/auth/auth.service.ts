import { Injectable } from '@angular/core';
import { User, auth } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class AuthService {

  constructor(private afStore:AngularFirestore) { }

  userDateFromDB(user:User){
    return new Promise((resolve,reject)=>{
        this.afStore.doc("UserProfile/"+user.uid).valueChanges().subscribe(d=>{
          if(d && d["roles"]["isAdmin"]){
            resolve(true);
          }else{
            reject(false)
          }
        })
    })
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const currentUser = auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}
