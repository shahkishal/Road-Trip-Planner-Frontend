import { Component, EventEmitter, Output } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ApiBrowseService } from '../apiBrowse.service';
import { IndividualTrip } from '../../shared/trip.model';

@Component({
  selector: 'app-comments',
  imports: [NzButtonModule, NzModalModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  browseData: IndividualTrip[] = [];

  @Output() allComments: EventEmitter<any> = new EventEmitter();

  constructor(private apiBrowse$: ApiBrowseService) {}

  //extra
  isVisible = false;

  showModal(id: string): void {
    this.isVisible = true;
    this.apiBrowse$.getBrowseData().subscribe((res) => {
      this.browseData = res;
      console.log(this.browseData);
      // this.browseData.values?.id;
      console.log(this.browseData.values);
      
    });
    this.apiBrowse$.getCommentData(id).subscribe((res) => {});
  }

  handleClose(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
