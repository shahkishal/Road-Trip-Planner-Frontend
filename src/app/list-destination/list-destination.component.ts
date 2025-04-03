import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService } from '../shared/destination.service';
import { ButtonsComponent } from '../buttons/buttons.component';
import { Trip } from '../shared/trips.model';
import { ApiService } from '../shared/api.service';
import { TripDeleteComponent } from '../trip-cards/trip-delete/trip-delete.component';
import { TripEditComponent } from '../trip-cards/trip-edit/trip-edit.component';
import { SortTripsComponent } from '../sort-trips/sort-trips.component';
import { SearchTripsComponent } from '../search-trips/search-trips.component';

@Component({
  selector: 'app-list-destination',
  imports: [
    CommonModule,
    ButtonsComponent,
    TripDeleteComponent,
    TripEditComponent,
    SortTripsComponent,
    SearchTripsComponent,
  ],
  templateUrl: './list-destination.component.html',
  styleUrl: './list-destination.component.css',
})
export class ListDestinationComponent implements OnInit {
  // receivedData: any = null;

  tripsData: Trip[] = []; // Trips fetched from backend
  sortedTripsList: Trip[] = [];
  selectedStatus: string = 'default';
  searchedTripData: any = '';

  searchTimeout: any;

  selectedTrip: Trip | null = null;
  paginatedTrips: Trip[] = [];
  maxPage = 0;
  currentPage = 1;
  pageSize = 3;
  totalPages = 0;

  constructor(
    private destination$: DestinationService,
    private api$: ApiService
  ) {}

  ngOnInit() {
    this.destination$.titleshow();
    this.destination$.authShow();
    // this.destinationService.currentDestination.subscribe((data) => {
    //   if (data) {
    //     this.receivedData = data;
    //   }
    // });
    this.api$.getTripsData(this.selectedStatus, 1, 1000).subscribe((data) => {
      this.tripsData = data;
      this.totalPages = Math.ceil(this.tripsData.length / this.pageSize);
      this.maxPage = this.totalPages;
      this.api$
        .getTripsData(this.selectedStatus, this.currentPage, this.pageSize)
        .subscribe((data) => {
          // this.updatePagination();
          this.tripsData = data;
        });
    });

    // this.fetchTrips();
  }

  updatePagination() {
    // const startIndex = (this.currentPage - 1) * this.pageSize;
    // const endIndex = startIndex + this.pageSize;
    // this.paginatedTrips = this.tripsData.slice(startIndex, endIndex);

    if (this.totalPages === 0) {
      this.currentPage = 0;
    }

    if (this.selectedStatus === 'default' && this.searchedTripData === '') {
      this.api$
        .getPaginated(this.currentPage, this.pageSize)
        .subscribe((data) => {
          this.tripsData = data;
        });
    } else if (this.selectedStatus === 'default') {
      this.totalPages = this.maxPage;

      this.api$
        .getSearchData(this.searchedTripData, this.currentPage, this.pageSize)
        .subscribe((data) => {
          console.log(data);
          this.tripsData = data;
        });
    } else if (this.searchedTripData === '') {
      this.totalPages = this.maxPage;
      this.api$
        .getSortData(this.selectedStatus, this.currentPage, this.pageSize)
        .subscribe((data) => {
          this.tripsData = data;
        });
    } else {
      this.totalPages = this.maxPage;
      this.api$
        .getPaginatedTripData(
          this.selectedStatus,
          this.currentPage,
          this.pageSize,
          this.searchedTripData
        )
        .subscribe((data) => {
          this.paginatedTrips = data;
          this.tripsData = this.paginatedTrips;
          console.log('paginated trip from backend', this.paginatedTrips);
          // if (this.selectedStatus === 'default') {
          // } else {
          // }
          // this.tripsData = this.paginatedTrips;
        });
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      console.log(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      console.log(this.currentPage);
    }
  }

  // fetchTrips() {
  //   this.api$.getTripsData().subscribe((data) => {
  //     this.tripsData = data;
  //   });
  // }

  editTrip(trip: Trip) {
    this.selectedTrip = { ...trip };
  }

  onTripDeleted(tripId: string) {
    // this.selectedTrip = trip; ///////// Set selected trip for modal
    console.log('triped', this.selectedTrip);

    this.tripsData = this.tripsData.filter((trip) => trip.id !== tripId);
    this.totalPages = Math.ceil(this.tripsData.length / this.pageSize);
    this.updatePagination();
  }

  onTripUpdated() {
    this.api$
      .getTripsData(this.selectedStatus, this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.tripsData = data || [];
      });
  }

  onTripSorted(selectedStatus: any) {
    console.log('emitted status', selectedStatus);

    // if (selectedStatus === 'default') {
    //   this.onTripUpdated(); ///reset to original
    // } else {
    //   this.api$
    //     .getSortData(selectedStatus, this.currentPage, this.pageSize)
    //     .subscribe((data) => {
    //       this.tripsData = data;
    //       console.log('sorted trips', this.tripsData);
    //       // this.totalPages = Math.ceil(this.tripsData.length / this.pageSize);
    //       this.currentPage = 1; //reset to first page
    //     });

    this.selectedStatus = selectedStatus;

    this.updatePagination();
    // this.tripsData = sortedListTrip;
    // console.log('sorted trip:', sortedListTrip);
  }

  onSearchTrip(searchedTripData: any): void {
    // this.tripsData = searchedTripData;
    // console.log('searched trip:', searchedTripData);

    clearTimeout(this.searchTimeout);

    if (searchedTripData === '') {
      this.searchedTripData = searchedTripData;
      this.updatePagination();
      //   this.onTripUpdated();
      //   // this.totalPages = Math.ceil(this.tripsData.length / this.pageSize);
      //   this.currentPage = 1; //reset to first page

      //   // this.searchedTripData.emit(searchedItem);
    } else {
      this.searchTimeout = setTimeout(() => {
        // console.log('works', input);
        // this.api$.getSearchData(searchedTripData).subscribe((data) => {
        //   this.tripsData = data;
        //   console.log('searched', this.tripsData);
        // this.searchedTripData.emit(searchedItem);
        this.searchedTripData = searchedTripData;
        // this.totalPages = Math.ceil(this.tripsData.length / this.pageSize);
        this.currentPage = 1; //reset to first page
        this.updatePagination();
        // });
      }, 500);
    }
  }
}
