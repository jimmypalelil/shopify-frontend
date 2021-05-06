import {Component, OnInit} from '@angular/core';
import {MovieService} from './services/movie.service';
import {faSearch, faThList} from '@fortawesome/free-solid-svg-icons';
import {Movie, OMDBResponse} from './models/OMDBResponse';
import {PageEvent} from '@angular/material/paginator';
import {Nominator} from './models/Nominator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'shopify';
  nominator: Nominator;
  icons = {
    search: faSearch,
    list: faThList
  };
  searchResults: OMDBResponse;
  searchQuery: string;

  constructor(private mService: MovieService, private snackbar: MatSnackBar) {
    this.nominator = this.mService.getNominator();
  }

  ngOnInit(): void {

  }

  getSearchResults(query: string, pageNum?: number): void {
    this.mService.searchMovie(query, pageNum)
      .then(res => this.nominator.setSearchResults(res));
  }

  handleNav(type: 'search' | 'list'): void {
    this.nominator.currentPage = type;
  }

  handlePage($event: PageEvent): void {
    console.log($event.pageIndex);
    this.getSearchResults('ram', $event.pageIndex + 1);
  }

  handleSearch(): void {
    console.log(this.searchQuery);
    if (this.searchQuery) {
      this.getSearchResults(this.searchQuery.trim());
    } else {
      this.nominator.clearSearchResults();
    }
  }

  handleNomination(movie: Movie): void {
    try {
      this.nominator.nominate(movie);
      if (this.nominator.nominations.size === 5) {
        this.snackbar.open('Congrats! You have successfully Nominated 5 Titles',
          'View', {duration: 2000})
          .onAction()
          .subscribe(() => this.handleNav('list'));
      }
    } catch (error) {
      console.log(error);
       this.snackbar.open(error, 'Dismiss', {duration: 2000});
    }
  }
}
