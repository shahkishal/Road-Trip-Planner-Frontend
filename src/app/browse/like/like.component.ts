import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ApiBrowseService } from '../apiBrowse.service';

@Component({
  selector: 'app-like',
  imports: [CommonModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css',
})
export class LikeComponent implements OnInit {
  @Input() TripId!: string;

  likeCount = 0;
  isLiked = false;
  isUnliked = true;

  constructor(private apiBrowse$: ApiBrowseService) {}

  ngOnInit() {
    this.fetchLikeCountnStatus(this.TripId);
  }

  fetchLikeCountnStatus(TripId: string) {
    this.apiBrowse$.getLikeCountnStatus(TripId).subscribe((res) => {
      this.likeCount = res.count;

      if (res.validation === true) {
        this.isLiked = true;
        this.isUnliked = false;
      } else {
        this.isLiked = false;
        this.isUnliked = true;
      }
    });
  }

  onLike() {
    console.log('liked!');
    this.isLiked = !this.isLiked;
    this.isUnliked = !this.isUnliked;

    this.apiBrowse$.postLike(this.TripId).subscribe((res) => {});

    this.apiBrowse$.getLikeCountnStatus(this.TripId).subscribe((res) => {
      this.likeCount = res.count;
    });
  }
}
