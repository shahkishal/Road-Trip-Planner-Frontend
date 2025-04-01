import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-trips',
  imports: [],
  templateUrl: './sort-trips.component.html',
  styleUrl: './sort-trips.component.css',
})
export class SortTripsComponent {
  sortData() {
    console.log('sort works');
  }
}
