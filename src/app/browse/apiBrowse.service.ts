import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualTrip } from '../shared/trip.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiBrowseService {
  // private apiUrl = 'https://localhost:5001/api/Browse'; /// kishal c2
  private apiUrl = 'http://localhost:5001/trips';

  constructor(private http: HttpClient) {}

  //get
  getBrowseData(): Observable<IndividualTrip[]> {
    return this.http.get<IndividualTrip[]>(this.apiUrl);
  }

  getCommentData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Comment/${id}`); /////to change
  }

  // post
  postComment(commentData: { TripID: any; Message: any }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Comment`, commentData);
  }
}
