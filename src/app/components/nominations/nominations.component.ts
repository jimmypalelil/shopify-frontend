import {Component, Input, OnInit} from '@angular/core';
import {Nominator} from '../../models/Nominator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-nominations',
  templateUrl: './nominations.component.html',
  styleUrls: ['./nominations.component.scss']
})
export class NominationsComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }

  @Input() nominator: Nominator;

  ngOnInit(): void {
  }

  handleNomination(movie): void {
    try {
      this.nominator.nominate(movie);
    } catch (error) {
      console.log(error);
      this.snackbar.open(error, 'Dismiss', {duration: 2000});
    }
  }
}
