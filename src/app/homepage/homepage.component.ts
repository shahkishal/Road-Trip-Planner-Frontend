import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  onGetStarted() {
    // console.log('workss');
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }
}
