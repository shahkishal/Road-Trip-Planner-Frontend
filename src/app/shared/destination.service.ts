import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinationData = new BehaviorSubject<any[]>([]);
  private apiUrl = 'http://localhost:5001/trips'; ////backend url
  public showTitle = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  currentDestination = this.destinationData.asObservable();

  updateDestination(data: any) {
    const currentList = this.destinationData.value;
    this.destinationData.next([...currentList, data]); ///////////this method ensures that whenever new data comes it will be saved here and sent ahead to another component..
  }

  createDestination(tripData: any): Observable<any> {
    return this.http.post(this.apiUrl, tripData);
  }

  getTripsData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addClicked() {
    this.showTitle.emit(false); ////stores false in showTitle
  }

  cancel() {
    this.showTitle.emit(true); ////stores true in showTitle
  }
}
