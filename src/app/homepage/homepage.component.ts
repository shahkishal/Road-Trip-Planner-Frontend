import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { DestinationService } from '../shared/destination.service';
import { LoadingSpinnerService } from '../shared/loading-spinner.service';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private destination$: DestinationService,
    private loading$: LoadingSpinnerService
  ) {}

  ngOnInit() {
    this.destination$.titleshow();
    this.loading$.hide();
  }

  onGetStarted() {
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  onSignIn() {
    console.log('signed in');
    this.destination$.titlehide();
    this.router.navigate(['sign-in'], { relativeTo: this.route });
  }

  onSignUp() {
    console.log('signed up');
    this.destination$.titlehide();
    this.router.navigate(['sign-up'], { relativeTo: this.route });
  }
}
