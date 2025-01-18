import { Component, Input } from '@angular/core';
import {Router} from "@angular/router"
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  constructor(private router: Router,private movieService: MovieService) { }
  @Input() movie!: any;
  deleteMovie(id:any){
    this.movieService.deleteMovie(id).subscribe((data) => {
      window.location.reload();
    });
  }
  updateMovie(id:any){
    const url = `/edit/${id}`
    this.router.navigate([url])
  }
}
