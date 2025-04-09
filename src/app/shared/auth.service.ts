import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public showLogout = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  logoutHandle() {
    const token = localStorage.getItem('loginId');
    console.log('id:', token);

    if (token === '') {
      this.showLogout.emit(false);
    } else {
      this.showLogout.emit(true);
    }
  }

  getUserRoleFromToken(): string | null {
    const token = localStorage.getItem('loginId');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.role;
      } catch (err) {
        console.error('Invalid token', err);
        return null;
      }
    }
    return null;
  }
}

export interface JwtPayload {
  role: string;
}
