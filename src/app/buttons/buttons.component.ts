import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../shared/destination.service';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {
  showBrowseDestination = false;
  showAddDestination = false;
  showBdBtn = true;
  showAdBtn = true;

  @Output() browserDestinations = new EventEmitter<string>();
  @Output() addDestinations = new EventEmitter<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private destination$: DestinationService
  ) {}

  onBrowseDestinationButtonCLicked() {
    this.destination$.titlehide(); //////here addCLicked value is false and thats what make title disappear.
    this.router.navigate(['/browse'], { relativeTo: this.route });
  }

  onAddDestinationButtonCLicked() {
    this.destination$.titlehide();
    this.router.navigate(['/add-new-trip'], { relativeTo: this.route });
  }

  handleAddDestinationBtnWhenClose() {
    this.showAddDestination = false;
    this.showAdBtn = true; /////////show add destination button again.
  }
}
