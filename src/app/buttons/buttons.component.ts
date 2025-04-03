import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../shared/destination.service';

@Component({
  selector: 'app-buttons',
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent implements AfterViewInit {
  showBrowseDestination = false;
  showAddDestination = false;
  showBdBtn = true;
  showAdBtn = true;
  // private modalInstance: any;

  @Output() browserDestinations = new EventEmitter<string>();
  @Output() addDestinations = new EventEmitter<string>();

  // onClick() {
  //   console.log('button is clicked!');
  // }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private destinationService: DestinationService
  ) {}

  ngAfterViewInit() {
    // const modalElement = document.getElementById('addButtonCenter');
    // if (modalElement) {
    //   this.modalInstance = new Modal(modalElement);
    // }
  }

  onBrowseDestinationButtonCLicked() {
    // console.log('browse desti click');
    // this.showBrowseDestination = !this.showBrowseDestination;
    // this.showBdBtn = false;
    this.destinationService.titlehide(); //////here addCLicked value is false and thats what make title disappear.
    this.router.navigate(['/browse-trips'], { relativeTo: this.route });
  }

  onAddDestinationButtonCLicked() {
    // console.log('add desti click');
    // this.showAddDestination = !this.showAddDestination;
    // this.showAdBtn = false;
    // if (this.modalInstance) {
    //   this.modalInstance.show();
    // }
    // this.showAddDestination = true;
    this.destinationService.titlehide();
    this.router.navigate(['/add-new-trip'], { relativeTo: this.route });
  }

  handleAddDestinationBtnWhenClose() {
    this.showAddDestination = false;
    this.showAdBtn = true; /////////show add destination button again.
  }

  // onModalClose() {
  //   this.showAddDestination = false;

  // }
}
