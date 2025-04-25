import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ButtonsComponent } from '../buttons/buttons.component';
import { TripDeleteComponent } from '../trip-cards/trip-delete/trip-delete.component';
import { TripEditComponent } from '../trip-cards/trip-edit/trip-edit.component';
import { SortTripsComponent } from '../sort-trips/sort-trips.component';
import { SearchTripsComponent } from '../search-trips/search-trips.component';

import { DestinationService } from '../shared/destination.service';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { LoadingSpinnerService } from '../shared/loading-spinner.service';
import { NotificationService } from '../shared/notifications/notification.service';

import { Trip } from '../shared/trips.model';
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
  public showLogout: any = true;
  public adminPanelHandle: any = false;

  tripsData: IndividualTrip[] = []; // Trips fetched from backend
  sortedTripsList: IndividualTrip[] = [];
  selectedStatus: string = 'default';
  searchedTripData: any = '';
  searchTimeout: any;
  selectedTrip: IndividualTrip | null = null;
  paginatedTrips: IndividualTrip[] = [];

  maxPage = 0;
  currentPage = 1;
  pageSize = 3;
  totalPages = 0;

  constructor(
    private destination$: DestinationService,
    public api$: ApiService,
    private auth$: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private loading$: LoadingSpinnerService,
    private notify$: NotificationService
  ) {}

  ngOnInit() {
    this.destination$.titleshow();
    const token = localStorage.getItem('loginId');
    console.log('id:', token);
    if (token === '') {
      this.notify$.show('warning', 'Please Register yourself first!');
      this.router.navigate(['sign-in']);
    }

    const role = this.auth$.getUserRoleFromToken();
    if (role === 'Admin') {
      this.adminPanelHandle = true;
    }
    console.log(role);

    this.auth$.showLogout.subscribe({
      next: (res: any) => {
        this.showLogout = res;
        this.cdr.detectChanges();
      },
    });
    this.auth$.logoutHandle();

    this.api$
      .getTripsData(this.selectedStatus, this.currentPage, this.pageSize)
      .subscribe((data: Trip) => {
        console.log(data.data);
        this.loading$.show();
        setTimeout(() => {
          this.loading$.hide();
          this.tripsData = data.data;
        }, 1000);
        this.totalPages = Math.ceil(data.totalTrips / this.pageSize);
        this.maxPage = this.totalPages;
        console.log(this.totalPages);
      });
  }

  updatePagination() {
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

  editTrip(trip: IndividualTrip) {
    this.selectedTrip = { ...trip };
  }

  onTripDeleted(tripId: string) {
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

    this.selectedStatus = selectedStatus;

    this.updatePagination();
  }

  onSearchTrip(searchedTripData: any): void {
    clearTimeout(this.searchTimeout);

    if (searchedTripData === '') {
      this.searchedTripData = searchedTripData;
      this.updatePagination();
    } else {
      this.searchTimeout = setTimeout(() => {
        this.searchedTripData = searchedTripData;
        this.currentPage = 1; //reset to first page
        this.updatePagination();
      }, 500);
    }
  }

  onLogout() {
    console.log('works');

    localStorage.setItem('loginId', '');
    let token = localStorage.getItem('loginId');
    console.log(token);
    this.router.navigate([''], { relativeTo: this.route });
  }

  onEditFormFormatClicked() {
    this.router.navigate(['admin-panel']);
  }
}
