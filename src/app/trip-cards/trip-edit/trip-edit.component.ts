import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Trip } from '../../shared/trips.model';
import { ApiService } from '../../shared/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  isVisible = false;

  constructor(private api$: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.trip) {
      this.prepopulated();
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      source: [''],
      destination: [''],
      from: [''],
      to: [''],
      duration: [''],
      description: [''],
      travelTypeId: [''],
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

    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      this.isVisible = false;
    }
  }
}
