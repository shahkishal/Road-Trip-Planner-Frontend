// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { ApiService } from '../../shared/api.service';
// import { Trip } from '../../shared/trips.model';

// @Component({
//   selector: 'app-trip-delete',
//   templateUrl: './trip-delete.component.html',
//   styleUrl: './trip-delete.component.css',
// })
// export class TripDeleteComponent {
//   @Input() trip: any; // Receives trip from parent
//   @Output() tripDeleted = new EventEmitter<void>(); //  Notify parent after delete
//   @Output() close = new EventEmitter<void>(); // Notify parent to close modal
//   tripsData: Trip[] = [];

//   // onConfirmDelete() {
//   //   if (this.trip) {
//   //     this.deleteConfirmed.emit(this.trip.id);
//   //   }
//   // }

//   constructor(private api$: ApiService) {}

//   onDeleteTrip() {
//     // console.log('works!');

//     if (!this.trip || !this.trip.id) {
//       console.error('Trip is missing!');
//       return;
//     }

//     this.api$.deleteTripsData(this.trip.id).subscribe(
//       () => {
//         // alert('Trip deleted successfully!');

//         this.tripDeleted.emit(); // Notify parent to refresh list
//       },
//       (error) => {
//         console.error('Error deleting trip:', error);
//         alert('Failed to delete trip');
//       }
//     );
//   }

//   closeModal() {
//     this.close.emit(); // Emit event to close the modal
//   }
// }

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ApiService } from '../../shared/api.service';
import { Trip } from '../../shared/trips.model';

@Component({
  selector: 'app-trip-delete',
  imports: [NzButtonModule, NzModalModule],
  templateUrl: './trip-delete.component.html',
})
export class TripDeleteComponent {
  @Input() trip!: Trip;
  @Output() tripDeleted = new EventEmitter<string>();
  isVisible = false;

  constructor(private api$: ApiService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    // console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleConfirm(): void {
    // console.log('Button ok clicked!');
    if (!this.trip || !this.trip.id) {
      console.error('Trip id is missing!');
      return;
    }

    this.api$.deleteTripsData(this.trip.id).subscribe(
      () => {
        this.tripDeleted.emit(this.trip.id); ///notify parent
        this.isVisible = false;
      },
      (error) => {
        console.error('Error deleting trips:', error);
      }
    );
  }
}
