import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error:any=''
  constructor(private _AuthService:AuthService,private _Router:Router) { }
  registerationForm=new FormGroup({
    first_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    last_name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    age:new FormControl(null,[Validators.required,Validators.min(16),Validators.max(100)]),
    password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.pattern("^[A-Z][a-z,0-9]{7,10}$")]),
  })
  regist(registerationForm:FormGroup){
    this._AuthService.signup(registerationForm.value).subscribe(result=>{
      if(result.message=="success"){
        this._Router.navigate(["/login"])
      }
      else{
        this.error=result.errors.email.message
      }
    },
    error=>{
      console.log(error)
    })
  }
  ngOnInit(): void {
  }

}
