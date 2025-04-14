import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBrowseService } from './apiBrowse.service';
import { DestinationService } from '../shared/destination.service';
import { IndividualTrip } from '../shared/trip.model';

@Component({
  selector: 'app-browse-destination',
  imports: [CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  browseData: IndividualTrip[] = [];

  constructor(
    private apiBrowse$: ApiBrowseService,
    private destination$: DestinationService
  ) {}

  ngOnInit() {
    this.destination$.titlehide();
    this.apiBrowse$.getBrowseData().subscribe((res) => {
      console.log(res);
      this.browseData = res;
    });
  }
}
