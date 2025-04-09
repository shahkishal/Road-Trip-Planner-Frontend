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

  getUserRoleFromToken(): string | string[] {
    const token = localStorage.getItem('loginId');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        // const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const roles = decoded.role;

        console.log(roles);
        if(!roles) return [];
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
  // [key: string]: any;
  // "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
  role  : string | string[]
}

