import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trip } from '../shared/trips.model';
import { IndividualTrip } from '../shared/trip.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiBrowseService {
  private apiUrl = 'https://localhost:5001/api/Browse';  /// kishal c2
  // private apiUrl = 'http://localhost:5001/trips';

  constructor(private http: HttpClient) {}

  getBrowseData(): Observable<IndividualTrip[]> {
    return this.http.get<IndividualTrip[]>(this.apiUrl);
  }
}
