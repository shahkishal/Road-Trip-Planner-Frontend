import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationService } from '../shared/destination.service';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'app-list-destination',
  imports: [CommonModule, ButtonsComponent],
  templateUrl: './list-destination.component.html',
  styleUrl: './list-destination.component.css'
})
export class ListDestinationComponent implements OnInit{
  receivedData: any = null;

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.destinationService.cancel();
      this.destinationService.currentDestination.subscribe((data) => {
        if (data) {
          this.receivedData = data;
        }
      });
  }
}
