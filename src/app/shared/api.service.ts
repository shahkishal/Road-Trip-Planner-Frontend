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

  // post
  createDestination(tripData: any): Observable<any> {
    return this.http.post(this.apiUrl, tripData);
  }

  sendDropDownDataToBackend(selectedId: string) {
    return this.http.post(this.apiUrl, { id: selectedId });
    // .subscribe((response) => {
    //   console.log('Response:', response);
    // });
  }

  // patch
  sendEditData(Id: string, tripData: Partial<Trip>): Observable<Trip> {
    return this.http.patch<Trip>(`${this.apiUrl}/${Id}`, tripData);
  }

  // get
  getTripsData(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}?pageNumber=1&pageSize=1000`);
  }

  getTripById(Id: string): Observable<any> {
    return this.http.get<Trip>(`${this.apiUrl}/${Id}`);
  }

  getTraveltypeData(): Observable<TravelType[]> {
    return this.http.get<TravelType[]>(this.apiUrlTravelType);
  }

  getSortData(state: any): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.apiUrl}?sortBy=Destination&isAscending=${state}`
    );
  }

  getSearchData(searchData: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.apiUrl}?filterOn=Destination&filterQuery=${searchData}`
    );
  }

  getPaginatedTripData(
    currentPage: number,
    pageSize: number
  ): Observable<Trip[]> {
    return this.http.get<Trip[]>(
      `${this.apiUrl}?pageNumber=${currentPage}&pageSize=${pageSize}`
    );
  }

  // delete
  deleteTripsData(Id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${Id}`);
  }
}
