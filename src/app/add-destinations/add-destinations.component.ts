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

@Component({
  selector: 'app-add-destinations',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-destinations.component.html',
  styleUrl: './add-destinations.component.css',
})
export class AddDestinationsComponent implements OnInit {
  // @ViewChild('addButtonCenter', { static: false }) modalRef!: ElementRef;

  @Output() closeForm = new EventEmitter<void>(); ///this is the event emitter that will notify parent component that close button is clicked

  // isModalOpen = false;

  constructor(
    private router: Router,
    private destinationDataService: DestinationService,
    private api$: ApiService
  ) {}

  form = new FormGroup({
    source: new FormControl('', { validators: [Validators.required] }),
    destination: new FormControl('', { validators: [Validators.required] }),
    from: new FormControl('', { validators: [Validators.required] }),
    to: new FormControl('', { validators: [Validators.required] }),
    duration: new FormControl('', { validators: [Validators.minLength(1)] }),
    description: new FormControl('', { validators: [Validators.minLength(5)] }),
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

  // get durationCalculation() {
  //   const dateFrom = this.form.get('date_from')?.value;
  //   const dateTo = this.form.get('date_to')?.value;

  //   if(!dateFrom || !dateTo) return null;

  //   const fromDate = new Date(dateFrom);
  //   const toDate = new Date(dateTo);

  //   const diffInMs = toDate.getTime()

  //   let date = 0;
  //   date = dateTo - dateFrom;
  //   return date
  // }

  oncancel() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Please fill in all required feilds correctly!');
    } else {
      this.destinationDataService.cancel();
      // const enteredDestination = this.form.value.add_destination;

      // console.log(enteredDestination);

      // console.log(
      //   'date',
      //   this.form.controls.from.value,
      //   this.form.controls.to.value
      // );

      console.log('submitted data', this.form.value);

      // this.destinationDataService.updateDestination(this.form.value); //////stores the new data and send it to another component with the help of the method we initialised in our service.ts file.

      this.api$.createDestination(this.form.value).subscribe(
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
          alert('something went wrong');
        }
      );
    }
  }

  ngOnInit() {
    //this.isModalOpen = true;
    // setTimeout(() => {
    //   if (this.modalRef) {
    //     const modalInstance = new Modal(this.modalRef.nativeElement);
    //     modalInstance.show();
    //   }
    // });
    this.destinationDataService.addClicked();
  }

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
