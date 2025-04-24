import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ApiService } from '../../shared/api.service';
import { IndividualTrip } from '../../shared/trip.model';
import { NotificationService } from '../../shared/notifications/notification.service';

@Component({
  selector: 'app-trip-delete',
  imports: [NzButtonModule, NzModalModule],
  templateUrl: './trip-delete.component.html',
})
export class TripDeleteComponent {
  @Input() trip!: IndividualTrip;
  @Output() tripDeleted = new EventEmitter<string>();
  isVisible = false;

  constructor(private api$: ApiService, private notify$: NotificationService) {}

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleConfirm(): void {
    if (!this.trip || !this.trip.id) {
      console.error('Trip id is missing!');
      this.notify$.show('warning', 'Trip id is missing!');
      return;
    }

    this.api$.deleteTripsData(this.trip.id).subscribe(
      () => {
        this.tripDeleted.emit(this.trip.id); ///notify parent
        this.notify$.show('success', 'Trip has been deleted successfully!');
        this.isVisible = false;
      },
      (error) => {
        console.error('Error deleting trips:', error);
        this.notify$.show('error', 'Error deleting trips:');
      }
    );
  }
}
