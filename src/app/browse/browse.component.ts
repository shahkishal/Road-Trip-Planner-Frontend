import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBrowseService } from './apiBrowse.service';
import { DestinationService } from '../shared/destination.service';
import { IndividualTrip } from '../shared/trip.model';
import { LoadingSpinnerService } from '../shared/loading-spinner.service';

@Component({
  selector: 'app-browse-destination',
  imports: [CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  browseData: IndividualTrip[] = [];

  // isLoading = true;

  constructor(
    private apiBrowse$: ApiBrowseService,
    private destination$: DestinationService,
    private loading$: LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.destination$.titlehide();
    this.loading$.show();
    this.fetchData();
  }

  fetchData() {
    this.apiBrowse$.getBrowseData().subscribe((res) => {
      console.log(res);
      this.browseData = res;
      this.loading$.hide();
    });
  }
}
