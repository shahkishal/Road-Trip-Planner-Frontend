import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from './trips.model';
import { TravelType } from './travelType.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5001/trips'; ////json backend url
  // private apiUrl = 'https://localhost:5001/api/Trip'; ////kishal backend url
  private apiUrlTravelType = 'https://localhost:5001/api/TravelType'; /////kishal chu

  constructor(private http: HttpClient) {}

  createDestination(tripData: any): Observable<any> {
    return this.http.post(this.apiUrl, tripData);
  }

  sendEditData(Id: string, tripData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${Id}`, tripData);
  }

  getTripsData(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTripById(Id: string): Observable<any> {
    return this.http.get<Trip>(`${this.apiUrl}/${Id}`);
  }

  getTraveltypeData(): Observable<TravelType[]> {
    return this.http.get<TravelType[]>(this.apiUrlTravelType);
  }

  deleteTripsData(Id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }

  sendDropDownDataToBackend(selectedId: string) {
    return this.http.post(this.apiUrl, { id: selectedId });
    // .subscribe((response) => {
    //   console.log('Response:', response);
    // });
  }
}
