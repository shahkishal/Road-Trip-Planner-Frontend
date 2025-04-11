import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBrowseService } from './apiBrowse.service';

@Component({
  selector: 'app-browse-destination',
  imports: [CommonModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css',
})
export class BrowseComponent implements OnInit {
  constructor(private apiBrowse$: ApiBrowseService) {}

  ngOnInit() {
    this.apiBrowse$.getBrowseData().subscribe((res) => {
      console.log(res);
      
    });
  }
}
