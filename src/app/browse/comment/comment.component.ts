import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiBrowseService } from '../apiBrowse.service';
import { CommentData } from './comment.model';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-comment',
  imports: [CommonModule, NzButtonModule, NzModalModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
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
  }

  handleClose(): void {
    this.isVisible = false;
  }
}
