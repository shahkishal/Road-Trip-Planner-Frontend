import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../shared/destination.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../shared/api.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerService } from '../../shared/loading-spinner.service';

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
    private route: ActivatedRoute,
    private loading$: LoadingSpinnerService
  ) {}

  usersignin = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
    // roles: new FormControl<string[]>([], { validators: [Validators.required] }),
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

  // get roleIsInvalid() {
  //   return (
  //     this.usersignin.controls.roles.invalid &&
  //     this.usersignin.controls.roles.touched
  //   );
  // }

  ngOnInit(): void {
    this.destination$.titlehide();
  }

  onRegister() {
    this.router.navigate(['sign-up']);
  }

  onSignInClicked() {
    console.log('sign in btn clicked!');
    this.loading$.show();

    if (this.usersignin.invalid) {
      this.usersignin.markAllAsTouched();
      alert('PLease fill all details correctly!');
    } else {
      const formvalues = this.usersignin.getRawValue();

      const userData = {
        username: formvalues.username!,
        password: formvalues.password!,
        // roles: formvalues.roles!,
      };
      this.api$.userLogIn(userData).subscribe(
        (response) => {
          this.loginId = response.message;
          // console.log(this.loginId);

          localStorage.setItem('loginId', this.loginId);

          this.router.navigate(['dashboard']);
          this.loading$.hide();

          alert('Login successfull!!');
        },
        (error) => {
          // console.error('something happende wroing', error);
          alert('Please enter correct values!');
        }
      );
    }
  }
}
