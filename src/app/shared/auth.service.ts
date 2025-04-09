import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      this.router.navigate(['sign-up'], { relativeTo: this.route });
      alert('Please Register Yourself First!!');
    } else {
      this.showLogout.emit(true);
    }
  }
}
