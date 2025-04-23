import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-like',
  imports: [CommonModule],
  templateUrl: './like.component.html',
  styleUrl: './like.component.css',
})
export class LikeComponent {
  @Input() TripId!: string;

  isLiked = false;
  isUnliked = true;

  onLike() {
    console.log('liked!');
    this.isLiked = !this.isLiked;
    this.isUnliked = !this.isUnliked;
  }
}
