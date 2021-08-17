import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Wishlist } from '../interfaces/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  addToWishList(data:Wishlist){
    return this._HttpClient.post(`https://route-egypt-api.herokuapp.com/addToFavorites`,data)
  }
  showTheWishList(token:any){
    return this._HttpClient.get(`https://route-egypt-api.herokuapp.com/getFavorites`,{headers:{
      token:token
    }})

  }
}
