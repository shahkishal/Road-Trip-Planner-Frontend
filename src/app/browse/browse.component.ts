import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { LikeComponent } from './like/like.component';

import { ApiBrowseService } from './apiBrowse.service';
import { DestinationService } from '../shared/destination.service';
import { LoadingSpinnerService } from '../shared/loading-spinner.service';
import { NotificationService } from '../shared/notifications/notification.service';
import { CommentComponent } from './comment/comment.component';

import { IndividualTrip } from '../shared/trip.model';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-browse-destination',
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    CommentComponent,
    ReactiveFormsModule,
    LikeComponent,
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  browseData: IndividualTrip[] = [];

  commentForm = new FormGroup({
    comment: new FormControl(''),
  });

  constructor(
    private apiBrowse$: ApiBrowseService,
    private destination$: DestinationService,
    private loading$: LoadingSpinnerService,
    private router: Router,
    private notify$: NotificationService
  ) {}

  ngOnInit() {
    this.destination$.titlehide();
    this.loading$.show(); //remove comment
    this.fetchData();
  }

  fetchData() {
    this.apiBrowse$.getBrowseData().subscribe((res) => {
      this.browseData = res;
      this.loading$.hide();
    });
  }

  onTitleClicked() {
    this.router.navigate(['dashboard']);
  }

  onPost(tripId: string) {
    const cmt = this.commentForm.controls.comment.value;
    console.log(cmt);

    if (cmt === '') {
      this.notify$.show('warning', 'Please enter a comment first!');
      return;
    }

    let commentData = {
      TripID: tripId,
      Message: cmt,
    };

    console.log(commentData);

    this.apiBrowse$.postComment(commentData).subscribe(() => {
      this.notify$.show('success', 'Comment Added!');
    });
    this.commentForm.reset();
  }
}
