import { Injectable } from '@angular/core';
import { Trip } from './trips.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  paginatedTrips: Trip[] = [];

  currentPage = 1;
  pageSize = 3;
  totalPages = 0;

  constructor(private api$: ApiService) {}

  updatePagination() {
    // const startIndex = (this.currentPage - 1) * this.pageSize;
    // const endIndex = startIndex + this.pageSize;
    // this.paginatedTrips = this.tripsData.slice(startIndex, endIndex);
    this.api$
      .getPaginatedTripData(this.currentPage, this.pageSize)
      .subscribe((data) => {
        this.paginatedTrips = data;
        this.totalPages = Math.ceil(this.paginatedTrips.length / this.pageSize);
        console.log('paginated trip from backend', this.paginatedTrips);
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      console.log('current page', this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      console.log('prev page', this.currentPage);
    }
  }
}
