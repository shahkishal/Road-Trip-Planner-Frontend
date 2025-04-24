import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DestinationService } from '../../shared/destination.service';
import { ApiService } from '../../shared/api.service';
import { LoadingSpinnerService } from '../../shared/loading-spinner.service';
import { NotificationService } from '../../shared/notifications/notification.service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  loginId: string = '';

  constructor(
    private destination$: DestinationService,
    private api$: ApiService,
    private router: Router,
    private loading$: LoadingSpinnerService,
    private notify$: NotificationService
  ) {}

  usersignin = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  get usernameIsInvalid() {
    return (
      this.usersignin.controls.username.invalid &&
      this.usersignin.controls.username.touched
    );
  }

  get passwordIsInvalid() {
    return (
      this.usersignin.controls.password.invalid &&
      this.usersignin.controls.password.touched
    );
  }

  ngOnInit(): void {
    this.destination$.titlehide();
    this.loading$.hide();
  }

  onRegister() {
    this.router.navigate(['sign-up']);
  }

  onSignInClicked() {
    console.log('sign in btn clicked!');
    this.loading$.show();

    if (this.usersignin.invalid) {
      this.usersignin.markAllAsTouched();
      this.notify$.show('warning', 'PLease fill all details correctly!');
    } else {
      const formvalues = this.usersignin.getRawValue();

      const userData = {
        username: formvalues.username!,
        password: formvalues.password!,
      };
      this.api$.userLogIn(userData).subscribe(
        (response) => {
          this.loginId = response.message;

          localStorage.setItem('loginId', this.loginId);

          this.router.navigate(['dashboard']);
          this.loading$.hide();

          this.notify$.show('success', 'Login successfull!!');
        },
        (error) => {
          this.notify$.show('warning', 'Please enter correct values!');
        }
      );
    }
  }
}
