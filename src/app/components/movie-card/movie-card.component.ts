import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../models/OMDBResponse';
import {faCheckCircle, faTimesCircle, faVoteYea} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  icons = {
    vote: faVoteYea,
    cancel: faTimesCircle
  };

  constructor() { }

  @Input() movie: Movie;

  @Output() nominated = new EventEmitter<any>();

  ngOnInit(): void {
  }
}
