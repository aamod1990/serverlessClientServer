import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  movie = {
    movieId:'',
    name: '',
    details: '',
    genre: '',
    actor: '',
    releaseDate: new Date()
  };
  isEditMode: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.movieService.getMovie(id).subscribe(movie => {
        this.movie = movie?.data?.body;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.movieService.updateMovie(this.movie.movieId!, this.movie).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.movieService.addMovie(this.movie).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
