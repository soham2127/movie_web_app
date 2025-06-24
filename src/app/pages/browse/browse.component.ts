import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { HeaderComponent } from '@core/components/header/header.component';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '@core/components/banner/banner.component';
import { MovieService } from '@app/shared/services/movie.service';
import { MovieCarouselComponent } from '@app/shared/components/movie-carousel/movie-carousel.component';
import { IVideoContent } from '@app/shared/models/video-content.interface';
import { forkJoin, map, Observable, of } from 'rxjs';
import { FooterComponent } from '@app/core/components/footer/footer.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [HeaderComponent, CommonModule, BannerComponent, MovieCarouselComponent,FooterComponent],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  private auth = inject(AuthService);
  movieService = inject(MovieService);

  name = '';
  email = '';
  userProfileImg = '';
 bannerDetails: Observable<any> = of(null);
bannerVideos: Observable<any> = of(null);


  constructor() {
    const userDataString = sessionStorage.getItem('loggedInUser');

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        this.name = userData.name;
        this.email = userData.email;
        this.userProfileImg = userData.picture;
      } catch (err) {
        console.error('Failed to parse userData', err);
        this.signOut();
      }
    } else {
      this.signOut();
    }
  }

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  upcomingMoviesS: IVideoContent[] = [];

  // sources = [
  //   this.movieService.getMovies(),
  //   this.movieService.getTvShows(),
  //   this.movieService.getRatedMovies(),
  //   this.movieService.getNowPlayingMovies(),
  //   this.movieService.getUpcomingMovies(),
  //   this.movieService.getPopularMovies(),
  //   this.movieService.getTopRated()
  // ];

  // ngOnInit(): void {
  //   forkJoin(this.sources)
  //     .pipe(
  //       map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
  //         return { movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated };
  //       })
  //     )
  //     .subscribe((res: any) => {
  //       this.movies = res.movies.results as IVideoContent[];
  //       this.tvShows = res.tvShows.results as IVideoContent[];
  //       this.ratedMovies = res.ratedMovies.results as IVideoContent[];
  //       this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
  //       this.upcomingMoviesS = res.upcoming.results as IVideoContent[];
  //       this.popularMovies = res.popular.results as IVideoContent[];
  //       this.topRatedMovies = res.topRated.results as IVideoContent[];
  //     });
  // }

ngOnInit(): void {
  this.movieService.getGuestSession().subscribe((sessionRes) => {
    const guestId = sessionRes.guest_session_id;

    forkJoin([
      this.movieService.getMovies(),
      this.movieService.getTvShows(),
      this.movieService.getNowPlayingMovies(),
      this.movieService.getUpcomingMovies(),
      this.movieService.getPopularMovies(),
      
    ])
    .pipe(
      map(([movies, tvShows,  nowPlaying, upcoming, popular]) => {
       
        return { movies, tvShows, nowPlaying, upcoming, popular };
      })
    )
    .subscribe((res: any) => {
      this.movies = (res.movies.results as IVideoContent[]).filter((movie: IVideoContent) => movie.poster_path);
      this.tvShows = res.tvShows.results as IVideoContent[];
      this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[];
      this.upcomingMoviesS = res.upcoming.results as IVideoContent[];
      this.popularMovies = res.popular.results as IVideoContent[];
      

      

       
      if (res?.movies?.results?.length > 0) {
  const firstMovie = res.movies.results[0];
  console.log('First movie:', firstMovie); // ✅ Now it works
  this.bannerDetails = this.movieService.getBannerDetail(firstMovie.id);
  this.bannerVideos = this.movieService.getBannerVideo(firstMovie.id);
}



    });
  });
}


  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }

  
}
