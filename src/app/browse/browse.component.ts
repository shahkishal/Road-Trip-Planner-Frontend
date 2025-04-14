import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBrowseService } from './apiBrowse.service';
import { DestinationService } from '../shared/destination.service';
import { IndividualTrip } from '../shared/trip.model';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-browse-destination',
  imports: [CommonModule, NzSpinModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  browseData: IndividualTrip[] = [];

  isLoading = true;

  constructor(
    private apiBrowse$: ApiBrowseService,
    private destination$: DestinationService
  ) {}

  ngOnInit() {
    this.destination$.titlehide();
    this.fetchData();
  }

  fetchData() {
    this.apiBrowse$.getBrowseData().subscribe((res) => {
      console.log(res);
      this.browseData = res;
      this.isLoading = false;
    });
  }
}
