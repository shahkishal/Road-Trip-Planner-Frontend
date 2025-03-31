import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService } from '../shared/destination.service';
import { ButtonsComponent } from '../buttons/buttons.component';
import { Trip } from '../shared/trips.model';
import { ApiService } from '../shared/api.service';
import { TripDeleteComponent } from '../trip-cards/trip-delete/trip-delete.component';
import { TripEditComponent } from '../trip-cards/trip-edit/trip-edit.component';

@Component({
  selector: 'app-list-destination',
  imports: [
    CommonModule,
    ButtonsComponent,
    TripDeleteComponent,
    TripEditComponent,
  ],
  templateUrl: './list-destination.component.html',
  styleUrl: './list-destination.component.css',
})
export class ListDestinationComponent implements OnInit {
  // receivedData: any = null;

  tripsData: Trip[] = []; // Trips fetched from backend
  selectedTrip: Trip | null = null;

  constructor(
    private destinationService: DestinationService,
    private api$: ApiService
  ) {}

  ngOnInit() {
    this.destinationService.cancel();
    // this.destinationService.currentDestination.subscribe((data) => {
    //   if (data) {
    //     this.receivedData = data;
    //   }
    // });
    this.api$.getTripsData().subscribe((data) => {
      this.tripsData = data || [];
    });

    // this.fetchTrips();
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
  }

  onTripUpdated() {
    this.api$.getTripsData().subscribe((data) => {
      this.tripsData = data || [];
    });
  }
}
