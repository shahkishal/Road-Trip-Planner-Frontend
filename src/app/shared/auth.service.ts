import { EventEmitter, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

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

  getUserRoleFromToken(): string | string[] {
    const token = localStorage.getItem('loginId');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log('decode data', decoded);
        const roles = decoded.role;

        console.log(roles);
        if (!roles) return [];
        else return roles;
      } catch (err) {
        console.error('Invalid token', err);
        return [];
      }
    }
    return [];
  }
}

export interface JwtPayload {
  role: string | string[];
}
