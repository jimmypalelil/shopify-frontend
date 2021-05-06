import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OMDBResponse} from '../models/OMDBResponse';
import {Nominator} from '../models/Nominator';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private BASE_URL = 'https://www.omdbapi.com/?apikey=d2f61881&type=movie';
  nominator: Nominator;

  constructor(private http: HttpClient) {
    this.nominator = new Nominator();
  }

  getNominator(): Nominator {
    return this.nominator;
  }

  makeURL(query: string, pageNum?: number): string {
    pageNum = pageNum || 1;
    return `${this.BASE_URL}&s=${query}&page=${pageNum}`;
  }

  searchMovie(query: string, pageNum?: number): Promise<OMDBResponse> {
    query = (query || '').trim();
    return this.http.get(this.makeURL(query, pageNum)).toPromise() as Promise<OMDBResponse>;
  }
}
