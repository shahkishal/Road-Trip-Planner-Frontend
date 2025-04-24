import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sort-trips',
  imports: [CommonModule],
  templateUrl: './sort-trips.component.html',
  styleUrl: './sort-trips.component.css',
})
export class SortTripsComponent {
  @Output() selectedSortStatus = new EventEmitter<any>();

  selectedState: string = '';
  constructor() {}

  onSortChange(status: any) {
    this.selectedState = status.target.value;
    console.log('selected order:', this.selectedState);

    this.selectedSortStatus.emit(this.selectedState);
  }
}
