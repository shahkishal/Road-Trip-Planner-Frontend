import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public showLogout = new EventEmitter<boolean>();

  constructor() {}

  logoutHandle() {
    const token = localStorage.getItem('loginId');
    console.log('id:', token);

    if (token === '') {
      this.showLogout.emit(false);
    } else {
      this.showLogout.emit(true);
    }
  }
}
