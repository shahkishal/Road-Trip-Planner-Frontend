import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndividualTrip } from '../shared/trip.model';
import { Observable } from 'rxjs';
import { LikeData } from './like/like.model';

@Injectable({
  providedIn: 'root',
})
export class ApiBrowseService {
  // private apiUrl = 'https://localhost:5001/api/Browse'; /// kishal c2
  private apiUrl = 'http://localhost:5001/trips';

  constructor(private http: HttpClient) {}

  //get
  getLikeCountnStatus(id: string): Observable<LikeData> {
    return this.http.get<LikeData>(`${this.apiUrl}/Like/${id}`);
  }

  getBrowseData(): Observable<IndividualTrip[]> {
    return this.http.get<IndividualTrip[]>(this.apiUrl);
  }

  getCommentData(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/Comment/${id}`); /////to change
  }

  // post
  postLike(likeData: { TripsId: any }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Like`, likeData);
  }

  postComment(commentData: { TripID: any; Message: any }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Comment`, commentData);
  }
}
