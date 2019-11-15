import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth, User } from 'firebase';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private afFirebaseData:AngularFirestoreCollection<any>;
  constructor(private afAuth:AngularFireAuth,private router:Router,private afDB:AngularFirestore) {
    this.afFirebaseData = this.afDB.collection('UserProfile');
  }

  login(data){
    return this.afAuth.auth.signInWithEmailAndPassword(data["email"],data["password"]).then((auth)=>{
      this.router.navigate(['/'])
    }); 
  }
  
  signWithEmailAndPassword(data1){
    this.afAuth.auth.createUserWithEmailAndPassword(data1["email"],data1["password"]).then((auth)=>{
      this.updateAuthProfile(auth,data1);
    }).catch((err)=>{
      alert(err.message)
    })
  }

  updateAuthProfile(auth1:auth.UserCredential,data1){
    let Pimage =  this.afAuth.auth.currentUser.photoURL;
    return this.afAuth.auth.currentUser.updateProfile({
      displayName:data1["firstName"]+" "+data1["lastName"],
        photoURL: Pimage?Pimage:"assets/profile.png"
    }).then(auth=>this.updateUserData(auth1.user,data1))
  }

  updateUserData(user:User,d){
    const userRef: AngularFirestoreDocument<any> = this.afFirebaseData.doc(user.uid);
    const data = {
      userId:user.uid,
      userName:user.displayName,
      userEmail:user.email,
      userPhoneNo:user.phoneNumber?user.phoneNumber:d?d["mobileNo"]:null,
      userProfile:user.photoURL,
      createDate:user.metadata.creationTime,
      lastSeen:user.metadata.lastSignInTime,
      roles:{
        isAdmin:false
      }
    }
    userRef.set(data,{merge:true}).catch(err=>console.log(err));
    this.router.navigate(["/"]) 
  }
}
