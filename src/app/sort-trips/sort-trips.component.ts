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
  // isAscending = true;
  selectedState = 'true | false';

  constructor(private api$: ApiService) {}

  sortListData() {
    // console.log('sort works');
    this.api$.getSortData(this.selectedState).subscribe((data) => {
      console.log('sorted data:', data);
      this.tripsData = data;
      this.listTripSorted.emit(this.tripsData);
    });
  }

  // toggleSort() {
  //   this.isAscending = !this.isAscending;
  //   console.log(this.isAscending);
  //   this.sortListData();
  // }

  onSortChange(status: any) {
    const selectedState = status.target.value;
    console.log('selected order:', selectedState);
    this.sortListData();
  }
}
