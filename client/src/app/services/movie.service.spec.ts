import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve movies from the API via GET', () => {
    const dummyMovies = { data: { body: [{ movieId: '1', name: 'Movie 1' }, { movieId: '2', name: 'Movie 2' }] } };

    service.getMovies().subscribe(movies => {
      expect(movies.data.body.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });

    const request = httpMock.expectOne(`${apiUrl}/listMovies`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMovies);
  });

  it('should retrieve a single movie by ID from the API via GET', () => {
    const dummyMovie = { data: { body: { movieId: '1', name: 'Movie 1' } } };

    service.getMovie('1').subscribe(movie => {
      expect(movie).toEqual(dummyMovie);
    });

    const request = httpMock.expectOne(`${apiUrl}/getMovie/1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMovie);
  });

  it('should add a new movie via POST', () => {
    const newMovie = { name: 'New Movie' };
    const response = { data: { body: { movieId: '3', name: 'New Movie' } } };

    service.addMovie(newMovie).subscribe(movie => {
      expect(movie).toEqual(response);
    });

    const request = httpMock.expectOne(`${apiUrl}/addMovie`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newMovie);
    request.flush(response);
  });

  it('should update an existing movie via PUT', () => {
    const updatedMovie = { id: '1', name: 'Updated Movie' };
    const response = { data: { body: updatedMovie } };

    service.updateMovie('1', updatedMovie).subscribe(movie => {
      expect(movie).toEqual(response);
    });

    const request = httpMock.expectOne(`${apiUrl}/editMovie/1`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(updatedMovie);
    request.flush(response);
  });

  it('should search for a movie by name via GET', () => {
    const dummyMovies = { data: { body: [{ movieId: '1', name: 'Movie 1' }] } };

    service.searchMovie('Movie 1').subscribe(movies => {
      expect(movies).toEqual(dummyMovies);
    });

    const request = httpMock.expectOne(`${apiUrl}/searchMovie/Movie 1`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMovies);
  });
});
