import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Trip } from '../../shared/trips.model';
import { ApiService } from '../../shared/api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TravelType } from '../../shared/travelType.model';
import { IndividualTrip } from '../../shared/trip.model';
import { NotificationService } from '../../shared/notifications/notification.service';

@Component({
  selector: 'app-trip-edit',
  imports: [NzButtonModule, NzModalModule, CommonModule, ReactiveFormsModule],
  templateUrl: './trip-edit.component.html',
  styleUrl: './trip-edit.component.css',
})
export class TripEditComponent implements OnInit {
  @Input() trip!: IndividualTrip;
  @Output() tripUpdated: EventEmitter<Trip> = new EventEmitter<Trip>();
  tripsData: Trip[] = []; // Trips fetched from backend
  form!: FormGroup;

  travelTypeData: TravelType[] = [];
  options: { id: string; name: string }[] = [];

  isVisible = false;

  constructor(
    private api$: ApiService,
    private fb: FormBuilder,
    private notify$: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.trip) {
      this.prepopulated();
    }

    this.api$.getTraveltypeData().subscribe((response) => {
      if (response && response.length > 0) {
        this.travelTypeData = response;
        this.options = [
          { id: '', name: 'Select one' },
          ...this.travelTypeData.map(({ id, type }) => ({
            id,
            name: type,
          })),
        ];
        this.form.patchValue({ travelTypeId: '' });
      }
    });

    this.form
      .get('from')
      ?.valueChanges.subscribe(() => this.calculateDuration());
    this.form.get('to')?.valueChanges.subscribe(() => this.calculateDuration());
  }

  initializeForm(): void {
    this.form = this.fb.group({
      source: ['', Validators.required],
      destination: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      duration: [''],
      description: [''],
      travelTypeId: ['', Validators.required],
      isPublic: [''],
      tripImage: [''],
    });
  }

  prepopulated(): void {
    this.form.patchValue({
      source: this.trip.source,
      destination: this.trip.destination,
      from: this.trip.from,
      to: this.trip.to,
      duration: this.trip.duration,
      description: this.trip.description,
      travelTypeId: this.trip.travelTypeId,
      isPublic: this.trip.isPublic,
      tripImage: this.trip.tripImage,
    });
  }

  showModal(): void {
    this.prepopulated();
    this.isVisible = true;
  }

  handleBack(): void {
    this.isVisible = false;
  }

  handleDone(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify$.show('warning', 'Please enter values correctly!');
      return;
    }

    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.api$.sendEditData(this.trip.id, this.form.value).subscribe(
        (updatedTrip) => {
          console.log('trip updated successfully:', updatedTrip);
          this.notify$.show('success', 'Trip Updated Successfully!');
          this.tripUpdated.emit(updatedTrip);
          this.isVisible = false;
        },
        (error) => {
          console.error('Error updating trip.', error);
          this.notify$.show('error', 'Error updating trip!');
        }
      );
    }
  }

  onIsPublicCheckboxClicked(event: Event) {
    console.log(event);

    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    console.log(isChecked);
    return isChecked;
  }

  calculateDuration() {
    const dateFrom = this.form.get('from')?.value;
    const dateTo = this.form.get('to')?.value;

    if (dateFrom && dateTo) {
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      const diffInDays = Math.ceil(
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffInDays >= 0) {
        this.form
          .get('duration')
          ?.setValue(diffInDays.toString(), { emitEvent: false });
      } else {
        this.form.get('duration')?.setValue('0', { emitEvent: false });
      }
    }
  }
}
