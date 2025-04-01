import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Trip } from '../shared/trips.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-trips',
  imports: [CommonModule],
  templateUrl: './sort-trips.component.html',
  styleUrl: './sort-trips.component.css',
})
export class SortTripsComponent {
  @Output() listTripSorted = new EventEmitter<Trip[]>();
  @Output() browsedTripSorted = new EventEmitter<Trip[]>();

  tripsData: Trip[] = []; // Trips fetched from backend
  isAscending = true;

  constructor(private api$: ApiService) {}

  sortListData() {
    // console.log('sort works');
    this.api$.getSortData(this.isAscending).subscribe((data) => {
      console.log('sorted data:', data);
      this.tripsData = data;
      this.listTripSorted.emit(this.tripsData);
    });
  }

  toggleSort() {
    this.isAscending = !this.isAscending;
    console.log(this.isAscending);
    this.sortListData();
  }
}
