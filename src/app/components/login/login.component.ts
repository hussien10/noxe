import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error:any;
  loginForm=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.pattern("^[A-Z][a-z,0-9]{7,10}$")]),
  })
  login(formData:FormGroup){
    this._AuthService.signin(formData.value).subscribe(response=>{
      if(response.message=="success"){
        localStorage.setItem("userToken",response.token)
        this._AuthService.safeToken()
        this._Router.navigate(["/home"])
      }
      else{
        this.error=response.message
      }
    })
  }
  constructor(private _AuthService:AuthService,private _Router:Router) { }
  ngOnInit(): void {
  }


}
