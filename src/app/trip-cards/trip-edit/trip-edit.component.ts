import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-trip-edit',
  imports: [NzButtonModule, NzModalModule, CommonModule, ReactiveFormsModule],
  templateUrl: './trip-edit.component.html',
  styleUrl: './trip-edit.component.css',
})
export class TripEditComponent implements OnInit {
  @Input() trip!: Trip;
  tripsData: Trip[] = []; // Trips fetched from backend
  form!: FormGroup;

  travelTypeData: TravelType[] = [];
  options: { id: string; name: string }[] = [];

  isVisible = false;

  constructor(private api$: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.trip) {
      this.prepopulated();
    }

    this.api$.getTraveltypeData().subscribe((response) => {
      if (response && response.length > 0) {
        this.travelTypeData = response;
        // console.log(this.travelTypeData);
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
    });
  }

  showModal(): void {
    this.prepopulated();
    this.isVisible = true;
  }

  handleBack(): void {
    // console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  handleDone(): void {
    // console.log('Button ok clicked!');
    // if (!this.trip || !this.trip.id) {
    //   console.error('Trip id is missing!');
    //   return;
    // }

    // console.log('editing trip with id:', this.trip.id);

    // this.api$.getTripById(this.trip.id).subscribe(
    //   (tripData) => {
    //     console.log('fetched trip:', tripData);
    //   },
    //   (error) => {
    //     console.error('error fetching trip data:', error);
    //   }
    // );

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.isVisible = false;
    }
  }

  calculateDuration() {
    const dateFrom = this.form.get('from')?.value;
    const dateTo = this.form.get('to')?.value;

    // console.log('date from:', dateFrom, 'date to:', dateTo);

    if (dateFrom && dateTo) {
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      const diffInDays = Math.ceil(
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // console.log('calculated duration:', diffInDays);

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
