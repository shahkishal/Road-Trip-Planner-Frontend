import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Trip } from '../shared/trips.model';

@Component({
  selector: 'app-sort-trips',
  imports: [],
  templateUrl: './sort-trips.component.html',
  styleUrl: './sort-trips.component.css',
})
export class SortTripsComponent {
  @Output() tripSorted = new EventEmitter<Trip[]>();

  tripsData: Trip[] = []; // Trips fetched from backend
  isAscending = true;

  constructor(private api$: ApiService) {}

  sortData() {
    // console.log('sort works');
    this.api$.getSortData(this.isAscending).subscribe((data) => {
      console.log('sorted data:', data);
      this.tripsData = data;
      this.tripSorted.emit(this.tripsData);
    });
  }

  toggleSort() {
    this.isAscending = !this.isAscending;
    console.log(this.isAscending);
    this.sortData();
  }
}
