import {Movie, OMDBResponse} from './OMDBResponse';

export class Nominator {
  currentSearchResults: OMDBResponse;
  currentPage: 'search' | 'list' =  'search';
  nominations = new Map<string, Movie>();

  constructor() {
    this.setNominationsFromLocalStorage();
  }

  setNominationsFromLocalStorage(): void {
    const entries = JSON.parse(localStorage.getItem('nominations'));
    if (entries) {
      for (const entry of entries) {
        this.nominations.set(entry[0], entry[1]);
      }
      console.log('set nominations from local storage');
      console.log(this.nominations);
    }
  }

  setSearchResults(results: OMDBResponse): void {
    this.currentSearchResults = results;
    for (const movie of results.Search) {
      if (this.nominations.has(movie.imdbID)) {
        movie.nominated = true;
      }
    }
  }

  clearSearchResults(): void {
    this.currentSearchResults = null;
  }

  nominate(movie: Movie): void {
    if (movie.nominated) {
      movie.nominated = false;
      this.nominations.delete(movie.imdbID);
    } else {
      if (this.nominations.size === 5) {
        throw new Error('You already have 5 Nominations!!!');
      }
      movie.nominated = true;
      this.nominations.set(movie.imdbID, movie);
      window['nominations'] = this.nominations;
      console.log(Array.from(this.nominations.entries()));
      localStorage.setItem('nominations', JSON.stringify(Array.from(this.nominations.entries())));
    }
  }
}
