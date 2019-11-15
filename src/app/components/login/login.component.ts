import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/core/login/login.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  loginFormGroup:FormGroup;
  forgetEmail:string;
  forgetPassword:FormGroup;
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  constructor(private fBuilder : FormBuilder,private authService:LoginService,private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';
    let passwordRegex: RegExp = /((?=.*\d)(?=.*[a-zA-Z]).{8,20})/ 
    this.loginFormGroup = this.fBuilder.group({
      "email":[null,[Validators.required,Validators.pattern(this.emailregex)]],
      "password":[null,[Validators.required,Validators.pattern(passwordRegex)]]
    });
  }

  onSubmit(value){
    this.authService.login(value).catch(err=>alert(err));
  }

}
