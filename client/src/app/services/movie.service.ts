import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listMovies`);
  }

  getMovie(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getMovie/${id}`);
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addMovie`, movie);
  }

  updateMovie(id: string, movie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/editMovie/${id}`, movie);
  }

  deleteMovie(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteMovie/${id}`);
  }
  searchMovie(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/searchMovie/${name}`);
  }

  // bulkEditMovies(movies: Movie[]): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/movies/bulk-edit`, movies);
  // }

  // bulkDeleteMovies(ids: string[]): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/movies/bulk-delete`, ids);
  // }
}
