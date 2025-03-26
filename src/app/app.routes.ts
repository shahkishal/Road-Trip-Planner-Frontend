import { Routes } from '@angular/router';
import { AddDestinationsComponent } from './add-destinations/add-destinations.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowseDestinationComponent } from './browse-destination/browse-destination.component';
import { ListDestinationComponent } from './list-destination/list-destination.component';

export const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'dashboard',
        component: ListDestinationComponent,
      },
    ],
  },
  {
    path: 'add-new-trip',
    component: AddDestinationsComponent,
  },
  {
    path: 'browse-trips',
    component: BrowseDestinationComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
