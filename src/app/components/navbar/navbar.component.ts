import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLogin:boolean=false
  constructor(private _AuthService:AuthService) {
    this._AuthService.userToken.subscribe(()=>{
      if(this._AuthService.userToken.getValue()!=null){
        this.isLogin=true
      }
      else{
        this.isLogin=false
      }
    })
   }

   logout(){
     this._AuthService.logout()
   }

  ngOnInit(): void {
  }

}
