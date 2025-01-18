import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any;

  constructor(private movieService: MovieService,private router:Router) { }

  ngOnInit(): void {
    this.findAll();
  }
  findAll(){
    this.movieService.getMovies().subscribe(movies => {
      console.log("movies",movies?.data?.body);
      this.movies = movies?.data?.body;
    });
  }
  handleSearch(searchTerm: string): void {
    console.log("Search term: ", searchTerm);
    if(searchTerm){
      this.movieService.searchMovie(searchTerm).subscribe((movies) => {
        this.movies = movies?.data?.body;
      });
    }else{
     this.findAll();
    }
   
  }
  addMovie(){
    this.router.navigate(["/add"])
  }
}
