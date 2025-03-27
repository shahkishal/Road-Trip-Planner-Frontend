import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService } from '../shared/destination.service';
import { ButtonsComponent } from '../buttons/buttons.component';
import { Trip } from '../shared/trips.modal';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-list-destination',
  imports: [CommonModule, ButtonsComponent],
  templateUrl: './list-destination.component.html',
  styleUrl: './list-destination.component.css',
})
export class ListDestinationComponent implements OnInit {
  receivedData: any = null;
  tripsData: Trip[] = [];

  constructor(
    private destinationService: DestinationService,
    private api$: ApiService
  ) {}

  ngOnInit(): void {
    this.destinationService.cancel();
    this.destinationService.currentDestination.subscribe((data) => {
      if (data) {
        this.receivedData = data;
      }
    });
    this.api$.getTripsData().subscribe((data) => {
      this.tripsData = data || [];
    });
  }

  onDelete(tripId: string) {
    // console.log('works!');
    if (!tripId) {
      console.error('Trip is missing!');
      return;
    }

    if (confirm('Are you sure you want to delete this trip?')) {
      this.api$.deleteTripsData(tripId).subscribe(
        () => {
          alert('Trip deleted successfully!');

          this.tripsData = this.tripsData.filter((trip) => trip.Id !== tripId);
        },
        (error) => {
          console.error('Error deleting trip:', error);
          alert('Failed to delete trip');
        }
      );
    }
  }
}
