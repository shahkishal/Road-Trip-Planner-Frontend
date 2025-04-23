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
import { CommentsComponent } from './comments/comments.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse-destination',
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    CommentsComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  browseData: IndividualTrip[] = [];

  // isLoading = true;

  commentForm = new FormGroup({
    comment: new FormControl(''),
  });

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
      // console.log(res);
      this.browseData = res;

      // for (const trip of this.browseData) {
      //   this.commentForm.addControl(trip.id, new FormControl(''));
      // }
      this.loading$.hide();
    });
  }

  onTitleClicked() {
    this.router.navigate(['dashboard']);
  }

  onPost(tripId: string) {
    const cmt = this.commentForm.controls.comment.value;
    console.log(cmt);

    let commentData = {
      TripID: tripId,
      Message: cmt,
    };

    console.log(commentData);

    this.apiBrowse$.postComment(commentData).subscribe(() => {});
    this.commentForm.reset();
  }
}
