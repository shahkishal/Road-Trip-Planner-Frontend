import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  private adminApiUrl = 'https://localhost:5001/api/TravelType';

  constructor(private http: HttpClient) {}

  //post
  sendEditFormData(formdata: any): Observable<any> {
    return this.http.post(this.adminApiUrl, formdata);
  }

  //get
  getTableValues(): Observable<any> {
    return this.http.get(this.adminApiUrl);
  }
}
