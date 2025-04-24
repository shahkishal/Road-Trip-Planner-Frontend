import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private destinationData = new BehaviorSubject<any[]>([]);

  public showTitle = new EventEmitter<boolean>();

  currentDestination = this.destinationData.asObservable();

  updateDestination(data: any) {
    const currentList = this.destinationData.value;
    this.destinationData.next([...currentList, data]); ///////////this method ensures that whenever new data comes it will be saved here and sent ahead to another component..
  }

  // title display functionality
  titleshow() {
    this.showTitle.emit(true); ////stores true in showTitle which will display title
  }

  titlehide() {
    this.showTitle.emit(false); ////stores false in showTitle which will hide the title
  }
}
