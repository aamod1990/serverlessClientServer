import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies', 'searchMovie']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [
        MovieListComponent,
        SearchBarComponent // Declare SearchBarComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule // Import FormsModule
      ],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findAll on ngOnInit', () => {
    spyOn(component, 'findAll');
    component.ngOnInit();
    expect(component.findAll).toHaveBeenCalled();
  });

  it('should fetch and assign movies on findAll', () => {
    const mockMovies = { data: { body: [{ title: 'Test Movie' }] } };
    movieService.getMovies.and.returnValue(of(mockMovies));

    component.findAll();

    expect(movieService.getMovies).toHaveBeenCalled();
    expect(component.movies).toEqual(mockMovies.data.body);
  });

  it('should handle search and fetch movies', () => {
    const searchTerm = 'Test';
    const mockMovies = { data: { body: [{ name: 'Test Movie' }] } };
    movieService.searchMovie.and.returnValue(of(mockMovies));

    component.handleSearch(searchTerm);

    expect(movieService.searchMovie).toHaveBeenCalledWith(searchTerm);
    expect(component.movies).toEqual(mockMovies.data.body);
  });

  it('should handle empty search term and call findAll', () => {
    spyOn(component, 'findAll');
    component.handleSearch('');
    expect(component.findAll).toHaveBeenCalled();
  });

  it('should navigate to add movie page on addMovie', () => {
    component.addMovie();
    expect(router.navigate).toHaveBeenCalledWith(['/add']);
  });
});
