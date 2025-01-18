import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieFormComponent } from './movie-form.component';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('MovieFormComponent', () => {
  let component: MovieFormComponent;
  let fixture: ComponentFixture<MovieFormComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovie', 'addMovie', 'updateMovie']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MovieFormComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: (key: string) => null } } // Mock without id
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieFormComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize in create mode if no id is present', () => {
    component.ngOnInit();
    expect(component.isEditMode).toBeFalse();
  });

  it('should initialize in edit mode if id is present', () => {
    // Mock route to return an id
    route.snapshot.paramMap.get = jasmine.createSpy().and.returnValue('1');
    const mockMovie = { data: { body: { movieId: '1', name: 'Test Movie', details: 'Details', genre: 'Genre', actor: 'Actor', releaseDate: new Date() } } };
    movieService.getMovie.and.returnValue(of(mockMovie));

    component.ngOnInit();

    expect(component.isEditMode).toBeTrue();
    expect(movieService.getMovie).toHaveBeenCalledWith('1');
    expect(component.movie).toEqual(mockMovie.data.body);
  });

  it('should call addMovie and navigate on form submit in create mode', () => {
    component.isEditMode = false;
    movieService.addMovie.and.returnValue(of({}));

    component.onSubmit();

    expect(movieService.addMovie).toHaveBeenCalledWith(component.movie);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call updateMovie and navigate on form submit in edit mode', () => {
    component.isEditMode = true;
    component.movie.movieId = '1';
    movieService.updateMovie.and.returnValue(of({}));

    component.onSubmit();

    expect(movieService.updateMovie).toHaveBeenCalledWith('1', component.movie);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
