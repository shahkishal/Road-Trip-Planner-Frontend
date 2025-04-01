import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Trip } from '../shared/trips.model';

@Component({
  selector: 'app-search-trips',
  imports: [],
  templateUrl: './search-trips.component.html',
  styleUrl: './search-trips.component.css',
})
export class SearchTripsComponent {
  @Output() searchedTripData: EventEmitter<Trip> = new EventEmitter();

  searchTimeout: any;
  constructor(private api$: ApiService) {}

  onSearch(input: any) {
    let searchedItem = input.target.value;

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      // console.log('works', input);
      this.api$.getSearchData(searchedItem).subscribe((data) => {
        searchedItem = data;
        console.log('searched', searchedItem);
        this.searchedTripData.emit(searchedItem);
      });
    }, 1000);
    // this.api$
  }
}
