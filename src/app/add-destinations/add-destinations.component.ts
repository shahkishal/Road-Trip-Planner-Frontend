import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { DestinationService } from '../shared/destination.service';
import { ApiService } from '../shared/api.service';
import { TravelType } from '../shared/travelType.model';
import { NotificationService } from '../shared/notifications/notification.service';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-add-destinations',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzCheckboxModule,
    NzButtonModule,
  ],
  templateUrl: './add-destinations.component.html',
  styleUrl: './add-destinations.component.css',
})
export class AddDestinationsComponent implements OnInit {
  @Output() closeForm = new EventEmitter<void>(); ///this is the event emitter that will notify parent component that close button is clicked
  travelTypeData: TravelType[] = [];
  options: { id: string; name: string }[] = [];
  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  uploadedImage: File | null = null;

  constructor(
    private router: Router,
    private destination$: DestinationService,
    private api$: ApiService,
    private notify$: NotificationService
  ) {}

  form = new FormGroup({
    source: new FormControl('', { validators: [Validators.required] }),
    destination: new FormControl('', { validators: [Validators.required] }),
    from: new FormControl('', { validators: [Validators.required] }),
    to: new FormControl('', { validators: [Validators.required] }),
    duration: new FormControl('', { validators: [Validators.min(1)] }),
    description: new FormControl(''),
    travelTypeId: new FormControl<string | null>(null, {
      validators: [Validators.required],
    }),
    isPublic: new FormControl(false),
    tripImage: new FormControl(),
  });

  get sourceIsInvalid() {
    return (
      this.form.controls.source.invalid && this.form.controls.source.touched
    );
  }

  get destinationIsInvalid() {
    return (
      this.form.controls.destination.invalid &&
      this.form.controls.destination.touched
    );
  }

  get dateFromIsInvalid() {
    return this.form.controls.from.invalid && this.form.controls.from.touched;
  }

  get dateToIsInvalid() {
    return this.form.controls.to.invalid && this.form.controls.to.touched;
  }

  get durationErrors() {
    const durationControl = this.form.get('duration');
    if (durationControl?.hasError('min') && durationControl.touched) {
      return 'Duration must be greater than 1!';
    }
    return null;
  }

  ngOnInit() {
    this.form
      .get('from')
      ?.valueChanges.subscribe(() => this.calculateDuration());
    this.form.get('to')?.valueChanges.subscribe(() => this.calculateDuration());

    this.destination$.titlehide();

    this.api$.getTraveltypeData().subscribe((response) => {
      this.travelTypeData = response;
      this.options = [
        { id: '', name: 'Select one' },
        ...this.travelTypeData.map(({ id, type }) => ({
          id,
          name: type,
        })),
      ];
      this.form.patchValue({ travelTypeId: '' });
    });
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

  oncancel() {
    this.router.navigate(['/dashboard']);
  }

  onIsPublicCheckboxClicked(event: Event) {
    console.log(event);

    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;
    console.log(isChecked);
    return isChecked;
  }

  onImgUploaded(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.uploadedImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.notify$.show(
        'warning',
        'Please fill in all required feilds correctly!'
      );
    } else {
      this.destination$.titleshow();

      const formData = new FormData();

      formData.append('source', this.form.get('source')?.value ?? '');
      formData.append('destination', this.form.get('destination')?.value ?? '');
      formData.append('from', this.form.get('from')?.value ?? '');
      formData.append('to', this.form.get('to')?.value ?? '');
      formData.append('duration', this.form.get('duration')?.value ?? '');
      formData.append('description', this.form.get('description')?.value ?? '');
      formData.append(
        'travelTypeId',
        this.form.get('travelTypeId')?.value ?? ''
      );
      formData.append(
        'isPublic',
        this.form.get('isPublic')?.value ? 'true' : 'false'
      );

      if (this.uploadedImage) {
        formData.append('TripImage', this.uploadedImage);
      }

      console.log('submitted data', this.form.value);

      this.api$.createDestination(formData).subscribe(
        (response) => {
          console.log('trip created:', response);
          this.notify$.show('success', 'Trip successfully added!');

          if (this.form.value.travelTypeId) {
            this.api$.sendDropDownDataToBackend(this.form.value.travelTypeId);
          }

          this.form.reset();

          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log('error', error);
          this.notify$.show('error', 'Something went wrong!');
        }
      );
    }
  }
}
