import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../shared/destination.service';
import { TripService } from './trip.service';
import { CommonModule } from '@angular/common';
import { Trip } from '../shared/trips.model';

@Component({
  selector: 'app-browse-destination',
  imports: [CommonModule],
  templateUrl: './browse-destination.component.html',
  styleUrl: './browse-destination.component.css',
})
export class BrowseDestinationComponent implements OnInit {
  trips: any[] = [];

  constructor(
    private destination$: DestinationService,
    private tripservice$: TripService
  ) {}

  ngOnInit(): void {
    this.destination$.addClicked();
    this.trips = this.tripservice$.getTrips();
  }

  sortedBrowsedTrips(sortedBrowsedTrips: Trip[]) {
    console.log('sorted browsed trips', sortedBrowsedTrips);
  }
}
