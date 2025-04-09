import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService } from '../shared/destination.service';
import { ButtonsComponent } from '../buttons/buttons.component';
import { Trip } from '../shared/trips.model';
import { ApiService } from '../shared/api.service';
import { TripDeleteComponent } from '../trip-cards/trip-delete/trip-delete.component';
import { TripEditComponent } from '../trip-cards/trip-edit/trip-edit.component';
import { SortTripsComponent } from '../sort-trips/sort-trips.component';
import { SearchTripsComponent } from '../search-trips/search-trips.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { IndividualTrip } from '../shared/trip.model';

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

  tripsData: IndividualTrip[] = []; // Trips fetched from backend
  sortedTripsList: IndividualTrip[] = [];
  selectedStatus: string = 'default';
  searchedTripData: any = '';
  public showLogout: any = true;

  searchTimeout: any;

  selectedTrip: IndividualTrip | null = null;
  paginatedTrips: IndividualTrip[] = [];
  maxPage = 0;
  currentPage = 1;
  pageSize = 3;
  totalPages = 0;

  constructor(
    private destination$: DestinationService,
    private api$: ApiService,
    private auth$: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.destination$.titleshow();
    const token = localStorage.getItem('loginId');
    console.log('id:', token);

    if (token === '') {
      alert('Please register yourself first!');
      this.router.navigate(['sign-up'], { relativeTo: this.route });
    } else {
      this.auth$.showLogout.subscribe({
        next: (res: any) => {
          this.showLogout = res;
          this.cdr.detectChanges();
        },
      });
      this.auth$.logoutHandle();
      // this.destination$.authHide();
      // this.destinationService.currentDestination.subscribe((data) => {
      //   if (data) {
      //     this.receivedData = data;
      //   }
      // });
      this.api$
        .getTripsData(this.selectedStatus, this.currentPage, this.pageSize)
        .subscribe((data: Trip) => {
          // this.updatePagination();
          this.tripsData = data.data;
          console.log(data.data);
          this.totalPages = Math.ceil(data.totalTrips / this.pageSize);
          this.maxPage = this.totalPages;
          console.log(this.totalPages);
        });
      // this.fetchTrips();
    }
  }

  updatePagination() {
    // const startIndex = (this.currentPage - 1) * this.pageSize;
    // const endIndex = startIndex + this.pageSize;
    // this.paginatedTrips = this.tripsData.slice(startIndex, endIndex);
    this.totalPages = this.maxPage;

    if (this.totalPages === 0) {
      this.currentPage = 0;
    }

    if (this.selectedStatus === 'default' && this.searchedTripData === '') {
      this.totalPages = this.maxPage;

      this.api$
        .getPaginated(this.currentPage, this.pageSize)
        .subscribe((data) => {
          this.tripsData = data.data;
        });
    } else if (this.selectedStatus === 'default') {
      this.api$
        .getSearchData(this.searchedTripData, this.currentPage, this.pageSize)
        .subscribe((data: Trip) => {
          console.log(data.data.length);
          this.totalPages = Math.ceil(data.totalTrips / this.pageSize);
          console.log(data);
          this.tripsData = data.data;
        });
    } else if (this.searchedTripData === '') {
      this.totalPages = this.maxPage;
      this.api$
        .getSortData(this.selectedStatus, this.currentPage, this.pageSize)
        .subscribe((data) => {
          this.tripsData = data.data;
        });
    } else {
      this.api$
        .getPaginatedTripData(
          this.selectedStatus,
          this.currentPage,
          this.pageSize,
          this.searchedTripData
        )
        .subscribe((data: Trip) => {
          this.paginatedTrips = data.data;
          this.totalPages = Math.ceil(data.totalTrips / this.pageSize);
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

  editTrip(trip: IndividualTrip) {
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
      .subscribe((data: Trip) => {
        this.tripsData = data.data || [];
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

  onLogout() {
    console.log('works');

    // token = '';
    localStorage.setItem('loginId', '');
    let token = localStorage.getItem('loginId');
    console.log(token);
    this.router.navigate([''], { relativeTo: this.route });
  }
}
