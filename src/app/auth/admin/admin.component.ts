import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { DestinationService } from '../../shared/destination.service';
import { AdminApiService } from './admin-api.service';
import { LoadingSpinnerService } from '../../shared/loading-spinner.service';
import { NotificationService } from '../../shared/notifications/notification.service';

import { EditFormFormat } from './editFormFormat.model';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';

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
    private loading$: LoadingSpinnerService,
    private notify$: NotificationService
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
        this.notify$.show('success', 'Entry deleted successfully!');
        console.log('deleted:', tableValueId);
      },
      (err) => {
        console.error('Error deleting entry:', err);
        this.notify$.show('error', 'Error deleting entry!');
      }
    );
  }

  onBack() {
    this.router.navigate(['dashboard']);
  }

  onEditFormSubmitted() {
    console.log('form data:', this.adminEditForm.value);

    const formData = this.adminEditForm.value;

    this.adminApi$.sendEditFormData(formData).subscribe((res) => {
      console.log('res:', res);
      this.notify$.show('success', 'New type of vehicle added!');
      this.adminApi$.getTableValues().subscribe((res) => {
        this.tableData = res;
        console.log(this.tableData);
      });
      this.adminEditForm.reset();
    });
  }
}
