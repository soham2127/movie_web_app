import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// const options = {
//   params: {
//     include_adult: 'false',
//     include_video: 'true',
//     language: 'en-US',
//     page: '1',
//     sort_by: 'popularity.desc',
//     with_original_language: 'mr'
//   },
//   headers: new HttpHeaders({
//     accept: 'application/json',
//     authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2JjNWU1OTRiODM1MzdjMGQzZGM2YzNiZWQxOTA1OCIsIm5iZiI6MTc1MDM0MjY1NS43MTQsInN1YiI6IjY4NTQxYmZmM2QyZTczZTQ5NmNjMjM2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nqIddGzkp-UZaMr-nRfEklViTluwq1Hotac-soAvrXQ'
//   })
// };

const commonHeaders = new HttpHeaders({
  accept: 'application/json',
  authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2JjNWU1OTRiODM1MzdjMGQzZGM2YzNiZWQxOTA1OCIsIm5iZiI6MTc1MDM0MjY1NS43MTQsInN1YiI6IjY4NTQxYmZmM2QyZTczZTQ5NmNjMjM2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nqIddGzkp-UZaMr-nRfEklViTluwq1Hotac-soAvrXQ'
});

const marathiMovieOptions = {
  params: {
    include_adult: 'false',
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc',
    with_original_language: 'mr'
  },
  headers: commonHeaders
};

const defaultOptions = {
  params: {
    language: 'en-US',
    page: '1'
  },
  headers: commonHeaders
};


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);


  getGuestSession() {
  return this.http.get<{ guest_session_id: string }>(
    'https://api.themoviedb.org/3/authentication/guest_session/new',
    { headers: commonHeaders }
  );
}


  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', marathiMovieOptions);
  }

  getTvShows() {
    return this.http.get('https://api.themoviedb.org/3/discover/tv',marathiMovieOptions)
  }

  // getRatedMovies() {
  //   return this.http.get('https://api.themoviedb.org/3/guest_session/guest_session_id/rated/movies', defaultOptions)
  // }

// getRatedMovies(guestSessionId: string) {
//   return this.http.get(
//     `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies`,
//     defaultOptions
//   );
// }


  getBannerImage(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, defaultOptions)
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`,  defaultOptions);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`,  defaultOptions);
  }

  getNowPlayingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', defaultOptions)
  }

  getPopularMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', defaultOptions)
  }

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming',  defaultOptions)


}
}
