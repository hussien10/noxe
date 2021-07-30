import { MoviesService } from './../../services/movies.service';
import { Component, OnInit,ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Autoplay } from "swiper/core";
import { Subscription } from 'rxjs';

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
  constructor(private _moviesService:MoviesService) { }

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
