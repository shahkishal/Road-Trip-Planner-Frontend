import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private trips = [
    {
      title: 'Ladakh to Kanniyakumari',
      distance: '3,800 km',
      time: '70-75 hrs',
      route:
        'Ladakh → Srinagar → Jammu → Delhi → Agra → Nagpur → Hyderabad → Bengaluru → Madurai → Kanyakumari',
      highlights: 'Pangong Lake, Dal Lake, Taj Mahal, Charminar',
    },
    {
      title: 'Manali to Rameshwaram',
      distance: '3,300 km',
      time: '55-60 hrs',
      route:
        'Manali → Delhi → Agra → Nagpur → Hyderabad → Bengaluru → Madurai → Rameshwaram',
      highlights: "Snowy Himalayas, Taj Mahal, Rameshwaram's Pamban Bridge",
    },
    {
      title: 'Jaipur to Gangtok',
      distance: '1,700 km',
      time: '35-40 hrs',
      route: 'Jaipur → Lucknow → Patna → Siliguri → Gangtok',
      highlights: "Jaipur's palaces, Ganges River, Gangtok's mountain views",
    },
    {
      title: 'Mumbai to Tawang',
      distance: '3,200 km',
      time: '65-70 hrs',
      route: 'Mumbai → Nagpur → Kolkata → Guwahati → Tezpur → Tawang',
      highlights: "Mumbai coastline, Nagpur's oranges, Tawang's monasteries",
    },
    {
      title: 'Ahmedabad to Kodaikanal',
      distance: '1,900 km',
      time: '40 hours',
      route: 'Ahmedabad → Mumbai → Pune → Bengaluru → Madurai → Kodaikanal',
      highlights:
        'Vibrant city life in Ahmedabad, Sahyadri hills near Pune, lush greenery in Kodaikanal’s hill station.',
    },
  ];

  getTrips() {
    return this.trips;
  }
}
