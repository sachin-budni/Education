import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<any>((resolve, reject) => {
      this.auth.getCurrentUser()
      .then(user => {
        return resolve(this.isAdmin(user));
      }, err => {
        this.router.navigate(['login']);
        return resolve(false);
      });
    });
  }

  isAdmin(user){
    return new Promise<any>((resolve,reject)=>{
      this.auth.userDateFromDB(user).then(d=>{
        resolve(d);
      }).catch(err=>{
        this.router.navigate(['']);
        reject(err);
      })
    })
  }
  
}

