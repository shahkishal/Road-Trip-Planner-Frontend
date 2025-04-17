import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../shared/destination.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AdminApiService } from './admin-api.service';
import { EditFormFormat } from './editFormFormat.model';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from '../../shared/loading-spinner.service';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, CommonModule, NzDividerModule, NzTableModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  tableData: EditFormFormat[] = [];
  constructor(
    private destination$: DestinationService,
    private adminApi$: AdminApiService,
    private router: Router,
    private loading$: LoadingSpinnerService
  ) {}

  adminEditForm = new FormGroup({
    type: new FormControl(''),
    seats: new FormControl(''),
    mileage: new FormControl(''),
  });

  get adminControls() {
    const data = this.adminEditForm.value;
    return data;
  }

  ngOnInit(): void {
    this.loading$.show();
    this.destination$.titlehide();
    this.adminApi$.getTableValues().subscribe((res) => {
      this.tableData = res;
      this.loading$.hide();
      console.log(this.tableData);
    });
  }

  onDelete(tableValueId: string) {
    this.tableData = this.tableData.filter(
      (tablevalue) => tablevalue.id !== tableValueId
    );
    this.adminApi$.deleteTableValue(tableValueId).subscribe(
      () => {
        alert('Entry deleted successfully!');
        console.log('deleted:', tableValueId);
      },
      (err) => {
        console.error('Error deleting entry:', err);
      }
    );
  }

  onBack() {
    this.router.navigate(['dashboard']);
  }

  onEditFormSubmitted() {
    console.log('form data:', this.adminEditForm.value);

    const formData = this.adminEditForm.value;

    const formattedData: EditFormFormat = {
      id: '',
      type: formData.type ?? '',
      seats: formData.seats ?? '',
      mileage: formData.mileage ?? '',
    };
    this.adminApi$.sendEditFormData(formData).subscribe((res) => {
      console.log('res:', res);
      this.adminApi$.getTableValues().subscribe((res) => {
        this.tableData = res;
        console.log(this.tableData);
      });
      // this.tableData.push(formattedData);
      this.adminEditForm.reset();
    });
  }
}
