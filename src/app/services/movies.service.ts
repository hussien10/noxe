import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  getTrendy(category:string):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${category}/day?api_key=f1aca93e54807386df3f6972a5c33b50`)
  }
  getDetailes(category:any,id:any):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/${category}/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US
    `)
  }
  getreviews(category:any,id:any){
    return this._HttpClient.get(`https://api.themoviedb.org/3/${category}/${id}/reviews?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=1`)
  }
  getCast(category:any,id:any){
    return this._HttpClient.get(`https://api.themoviedb.org/3/${category}/${id}/credits?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US
    `)
  }
  getMovieCredit(id:number){
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
  }
  getTvCredit(id:number){
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`)
  }
  constructor(private _HttpClient:HttpClient) { }
}
