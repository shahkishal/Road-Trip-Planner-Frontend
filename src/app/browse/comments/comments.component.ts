import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ApiBrowseService } from '../apiBrowse.service';
import { CommonModule } from '@angular/common';
import { CommentData } from './comment.model';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, NzButtonModule, NzModalModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent {
  commentsData: CommentData[] = [];

  @Input() TripId!: string;
  @Output() allComments: EventEmitter<any> = new EventEmitter();

  constructor(private apiBrowse$: ApiBrowseService) {}

  //extra
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
    console.log(this.TripId);
    this.apiBrowse$.getCommentData(this.TripId).subscribe((res) => {
      this.commentsData = res;
      console.log(this.commentsData);
    });
    // this.apiBrowse$.getCommentData(id).subscribe((res) => {});
  }

  handleClose(): void {
    // console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
