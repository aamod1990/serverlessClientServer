import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['deleteMovie']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MovieCardComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Setting up a mock movie input
    component.movie = {
      id: 1,
      title: 'Test Movie',
      genre: 'Action',
      actors: 'Actor 1, Actor 2',
      releaseDate: '2024-07-30'
    };

    fixture.detectChanges(); // Detect changes to apply the input value
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should navigate to the edit page on updateMovie', () => {
    component.updateMovie(1);

    expect(router.navigate).toHaveBeenCalledWith(['/edit/1']);
  });
});
