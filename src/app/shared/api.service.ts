import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from './trips.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5001/trips'; ////json backend url
  // private apiUrl = 'https://localhost:5001/api/Trip'; ////kishal backend url

  constructor(private http: HttpClient) {}

  createDestination(tripData: any): Observable<any> {
    return this.http.post(this.apiUrl, tripData);
  }

  getTripsData(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  deleteTripsData(Id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }
}
