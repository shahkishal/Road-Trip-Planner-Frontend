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

@Component({
  selector: 'app-add-destinations',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-destinations.component.html',
  styleUrl: './add-destinations.component.css',
})
export class AddDestinationsComponent implements OnInit {
  // @ViewChild('addButtonCenter', { static: false }) modalRef!: ElementRef;

  @Output() closeForm = new EventEmitter<void>(); ///this is the event emitter that will notify parent component that close button is clicked
  travelTypeData: TravelType[] = [];
  options: { id: string; name: string }[] = [];

  // { id: '758ff8a2-255f-49f8-80c9-08dd6d1d356e', name: 'Sedan' },
  // { id: '237rf3bh4f783hf98h348fh378fh', name: 'SUV' },

  // isModalOpen = false;

  constructor(
    private router: Router,
    private destination$: DestinationService,
    private api$: ApiService
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
  });

  // addDestinationData: AddDestination = {
  //   destination: '',
  //   dateFrom: '',
  //   dateTo: '',
  //   duration: '',
  //   description: '',
  // };

  // showSuccessAlert = false;

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
    //this.isModalOpen = true;
    // setTimeout(() => {
    //   if (this.modalRef) {
    //     const modalInstance = new Modal(this.modalRef.nativeElement);
    //     modalInstance.show();
    //   }
    // });

    this.form
      .get('from')
      ?.valueChanges.subscribe(() => this.calculateDuration());
    this.form.get('to')?.valueChanges.subscribe(() => this.calculateDuration());

    this.destination$.titlehide();
    // this.destination$.authHide();
    // this.form.get('from')?.valueChanges.subscribe(() => {
    //   this.updateDuration();
    // });

    // this.form.get('to')?.valueChanges.subscribe(() => {
    //   this.updateDuration();
    // });

    this.api$.getTraveltypeData().subscribe((response) => {
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
    });
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

  // updateDuration() {
  //   const dateFrom = this.form.get('from')?.value;
  //   const dateTo = this.form.get('to')?.value;

  //   if (!dateFrom || !dateTo) return null;

  //   const fromDate = new Date(dateFrom);
  //   const toDate = new Date(dateTo);

  //   const diffInTime = toDate.getTime() - fromDate.getTime();

  //   const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  //   const durationInDays = diffInDays > 0 ? `${diffInDays} days` : 'Invalid Date Range';

  //   this.form.patchValue({ duration: durationInDays});
  // }

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

  onSubmit() {
    if (this.form.invalid) {
      alert('Please fill in all required feilds correctly!');
    } else {
      this.destination$.titleshow();
      // this.destination$.authShow();
      // const enteredDestination = this.form.value.add_destination;

      // console.log(enteredDestination);

      // console.log(
      //   'date',
      //   this.form.controls.from.value,
      //   this.form.controls.to.value
      // );

      // this.form.patchValue({
      //   duration: this.durationCalculation,
      // });

      const formData = {
        ...this.form.getRawValue(),
        duration: this.form.get('duration')?.value,
      };

      console.log('submitted data', this.form.value);

      // this.onIsPublicCheckboxClicked(this.form.controls.isPublic);
      // this.destinationDataService.updateDestination(this.form.value); //////stores the new data and send it to another component with the help of the method we initialised in our service.ts file.

      this.api$.createDestination(formData).subscribe(
        (response) => {
          console.log('trip created:', response);
          alert('Trip successfully added!');

          // this.showSuccessAlert = true;

          // setTimeout(() => {
          //   this.showSuccessAlert = false;
          // }, 5000);
          // console.log('toastworks');

          // setTimeout(() => {
          //   this.closeForm.emit();
          // }, 1000);

          if (formData.travelTypeId) {
            this.api$.sendDropDownDataToBackend(formData.travelTypeId);
          }

          this.form.reset();

          this.router.navigate(['/dashboard']);
          // if (this.modalRef) {
          //   const modalInstance = Modal.getInstance(this.modalRef.nativeElement);
          //   modalInstance?.hide();
          // }

          // this.closeForm.emit(); ////event emit to show add destination button again when the button submit is clicked.
        },
        (error) => {
          console.log('error', error);
          alert('something went wrong!');
        }
      );
    }
  }

  // onSelectChange(event: Event) {
  //   const target = event.target as HTMLSelectElement;
  //   this.selectedOption = target.value;
  // }

  // closeModal() {
  //   this.isModalOpen = false;
  //   this.router.navigate(['/']);
  //   this.closeForm.emit();
  // }

  // closeModal() {
  //   if (this.modalRef) {
  //     const modalInstance = Modal.getInstance(this.modalRef.nativeElement);
  //     modalInstance?.hide();
  //   }

  //   this.closeForm.emit();  ////event emit to show add destination button again when cancel is clicked.
  // }

  // onCancelClickShowHomePage() {
  //   console.log('this works')
  //   this.showAddDestinationBtn = true;
  // }
}
