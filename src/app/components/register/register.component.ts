import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  requiredText:string="this.field is required";
  loginFormGroup:FormGroup;
  constructor(private fBuilder : FormBuilder,public loginService:LoginService) { }

  ngOnInit() {
    let phoneregex: RegExp = /^[6-9]\d{9}$/;
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let passwordRegex: RegExp = /((?=.*\d)(?=.*[a-zA-Z]).{8,20})/
    let forAll : RegExp = /^[-a-zA-Z-()]+(\s+[-a-zA-Z-()]+)*$/
    this.loginFormGroup = this.fBuilder.group({
      "firstName":[null,[Validators.required,Validators.pattern(forAll)]],
      "lastName":[null,[Validators.required,Validators.pattern(forAll)]],
      "mobileNo":[null,[Validators.required,Validators.pattern(phoneregex)]],
      "email":[null,[Validators.required,Validators.pattern(emailregex)]],
      "password":[null,[Validators.required,Validators.pattern(passwordRegex)]]
    });
  }

  phoneNumError(){
    return this.loginFormGroup.get("mobileNo").hasError('required') ? 'Field is required' :
      this.loginFormGroup.get("mobileNo").hasError('pattern') ? 'Not Valid Mobile Number' :'';
  }

  commonError(name){
    return this.loginFormGroup.get(name).hasError('required') ? 'Field is required' :
      this.loginFormGroup.get(name).hasError('pattern') ? 'Space is not Allowed' :'';
  }

  getErrorPassword() {
    return this.loginFormGroup.get('password').hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('password').hasError('pattern') ? 'Not a valid password' :'';
  }

  getErrorEmail() {
    return this.loginFormGroup.get('email').hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :'';
        // this.loginFormGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : ''
  }
  onSubmit(data){
    this.loginService.signWithEmailAndPassword(data);
  }

}
