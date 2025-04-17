import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBrowseService } from './apiBrowse.service';
import { DestinationService } from '../shared/destination.service';
import { IndividualTrip } from '../shared/trip.model';
import { LoadingSpinnerService } from '../shared/loading-spinner.service';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-destination',
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  browseData: IndividualTrip[] = [];

  // isLoading = true;

  constructor(
    private apiBrowse$: ApiBrowseService,
    private destination$: DestinationService,
    private loading$: LoadingSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.destination$.titlehide();
    this.loading$.show(); //remove comment
    this.fetchData();
  }

  fetchData() {
    this.apiBrowse$.getBrowseData().subscribe((res) => {
      console.log("------------------------");
      console.log(res);
      this.browseData = res;
      this.loading$.hide();
    });
  }

  onTitleClicked() {
    this.router.navigate(['dashboard']);
  }
}
