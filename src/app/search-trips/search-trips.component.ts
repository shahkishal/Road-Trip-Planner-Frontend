import { Component, EventEmitter, Output } from '@angular/core';
import { Trip } from '../shared/trips.model';

@Component({
  selector: 'app-search-trips',
  imports: [],
  templateUrl: './search-trips.component.html',
  styleUrl: './search-trips.component.css',
})
export class SearchTripsComponent {
  // @Output() searchedTripData: EventEmitter<Trip[]> = new EventEmitter();
  @Output() searchItem: EventEmitter<string> = new EventEmitter();

  tripsData: Trip[] = []; // Trips fetched from backend

  constructor() {}

  onSearch(input: any) {
    let searchedItem = input.target.value;
    this.searchItem.emit(searchedItem);
  }
}
