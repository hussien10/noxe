import { MoviesService } from './../../services/movies.service';
import { Subscription } from 'rxjs';
import { Component, Input, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import SwiperCore, { Autoplay } from "swiper/core";
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class CreditsComponent implements OnInit ,OnDestroy {
  @Input ()id!:number
  movieCredits!:any
  tvCredits!:any
  moviesub!:Subscription
  tvsub!:Subscription
  imagePaseUrl:string=`https://image.tmdb.org/t/p/w500`
  name=localStorage.getItem("name")
  noPoster='../../../assets/images/no-poster-available.jpg'
  constructor(private _MovieService:MoviesService) { }

  ngOnInit(): void {
   this.moviesub= this._MovieService.getMovieCredit(this.id).subscribe(response=>{
      this.movieCredits=response
    })

    this.tvsub=this._MovieService.getTvCredit(this.id).subscribe(response=>{
      this.tvCredits=response
    })
  }
  ngOnDestroy(): void{
    this.moviesub.unsubscribe()
    this.tvsub.unsubscribe()

  }

}
