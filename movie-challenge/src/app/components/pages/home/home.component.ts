import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from 'src/app/services/tmdb/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentPage: number = 1;
  totalPages: number = 0;
  movies: any[] = [];
  genres: any[] = [];
  orderBy: any[] = [];
  moviesByGenre: any[] = [];
  selectedGenre?: string;
  selectedOrder: string = 'popularity.desc';
  keyWord?: string;

  constructor(
    private readonly _SERVICE: TmdbService,
    private readonly _ROUTE: ActivatedRoute, 
  ){}
  
    ngOnInit(): void {
      const queryParams = this._ROUTE.snapshot.queryParamMap;
      const genreParam = queryParams.get('genre');
      const orderParam = queryParams.get('order');
      const pageNumberParam = queryParams.get('pageNumber');
    
      // Verifica se existeum parâmetro para gênero
      if (genreParam !== null) {
        this.selectedGenre = genreParam.toString();
      }
    
      // Verifica se existe um parâmetro para ordenação
      if (orderParam !== null) {
        this.selectedOrder = orderParam.toString();
      }
    
      // Verifica se existe um parâmetro para número da página
      if (pageNumberParam !== null) {
        const parsedPageNumber = parseInt(pageNumberParam, 10);
        this.currentPage = isNaN(parsedPageNumber) ? 1 : parsedPageNumber;
      }
      this.loadMovies();
      this.genreList();
      // this.loadOrderingOptions();

  }

  onPageChanged(page: number){
    console.log(page);
    this.currentPage = page;
    this.loadMovies();
  }

  loadMovies(){
    const genreParam = this.selectedGenre !== '0' ? this.selectedGenre : undefined;
    const keyWordParam = this.keyWord ? this.keyWord : undefined;
    this._SERVICE.getMoviesByPages(
      // this.currentPage, this.selectedGenre ?this.selectedGenre: undefined, this.selectedOrder, this.keyWord ?this.keyWord: undefined
      this.currentPage, genreParam, this.selectedOrder, keyWordParam
      ).subscribe({
      next: (data: any) => {
        console.log(data);
        this.totalPages = data.total_pages;
        this.movies = data.results;
      },
    });
  }

  loadMoviesWithGenre(){
    this._SERVICE.getMoviesByPages(this.currentPage, this.selectedGenre).subscribe({
      next: (data: any) => {
        console.log(data)
        this.totalPages = data.total_pages;
        this.movies = data.results;
        console.log(this.currentPage, this.selectedGenre)
      }
    })
  }

  genreList(){
    this._SERVICE.getGenres().subscribe({
      next: (data: any) => {
        this.genres = data.genres
        console.log("movie-list: ", data);
      },
    });
  }

  orderList(sortBy: string) {
    sortBy = sortBy || 'popularity.desc';
    this._SERVICE.getOrder(sortBy).subscribe({
      next: (data: any) => {
      // this.ordering = data.results
      console.log("order: ", data.results);
      }
    })
  }

  filterChanged(event: { genreId: string, orderBy:string, keyWord: string }) {
    console.log('Filter Changed in HomeComponent', event);
    const { genreId, orderBy, keyWord} = event;
    this.selectedGenre = genreId;
    this.selectedOrder = orderBy;
    this.keyWord = keyWord;
    this.loadMovies();
  }

  showMoviesWithGenre(genreId: string) {
    this._SERVICE.getSelectedGenre(genreId).subscribe({
      next: (data:any) => {
        this.moviesByGenre = data.results;
        console.log('Get movies with genre', data);
        this.totalPages = data.total_pages;
        this.movies = data.results;
      }
    })
  }
}

