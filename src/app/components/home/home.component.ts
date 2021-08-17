import { WishlistService } from './../../services/wishlist.service';
import { MoviesService } from './../../services/movies.service';
import { Component, OnInit,Renderer2,ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Autoplay } from "swiper/core";
import { Subscription } from 'rxjs';
import { Wishlist } from 'src/app/interfaces/wishlist';
import jwtDecode from 'jwt-decode';


// install Swiper modules
SwiperCore.use([Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class HomeComponent implements OnInit {
  imagePaseUrl:string=`https://image.tmdb.org/t/p/w500`
  background!:string
  movieSub!:Subscription
  trendyMovies!:Array<any>
  tvSub!:Subscription
  trendyTv!:Array<any>
  actorSub!:Subscription
  trendyActors!:Array<any>
  wishSub!:Subscription
  data!:Wishlist
  token:any=localStorage.getItem("userToken")
  userToken:any=jwtDecode(this.token)
  constructor(private _moviesService:MoviesService,private _wishlistService:WishlistService,private _render:Renderer2) {

  }
  imgError(e:any){
    this._moviesService.imgError(e)
  }
  addToFav(name:string,img:string,id:string,e:any){
    if(e.target.style.color!='red'){
      this._render.setStyle(e.target,'color','red')

    }
    else{
      this._render.setStyle(e.target,'color','black')
    }

    this.data={
      movieName:name,
      imgUrl:img,
      userID:this.userToken._id,
      movieID:id,
      token:this.token
    }
    this.wishSub=this._wishlistService.addToWishList(this.data).subscribe(res=>{
    },
    error=>{
      console.log(error)
    })

  }


  ngOnInit(): void {
    this.movieSub=this._moviesService.getTrendy("movie").subscribe(
      response=>{
        this.trendyMovies=response.results.slice(0,10)
        this.background=`url(${this.imagePaseUrl+this.trendyMovies[0].backdrop_path})`
      }
    )
    this.tvSub=this._moviesService.getTrendy("tv").subscribe(
      response=>{
        this.trendyTv=response.results.slice(0,10)
      }
    )
    this.actorSub=this._moviesService.getTrendy("person").subscribe(
      response=>{
        this.trendyActors=response.results.slice(0,10)
      }
    )
  }

}
