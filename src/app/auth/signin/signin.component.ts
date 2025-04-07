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

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  constructor(
    private destination$: DestinationService,
    private api$: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  usersignin = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
    role: new FormControl([], { validators: [Validators.required] }),
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

  get roleIsInvalid() {
    return (
      this.usersignin.controls.role.invalid &&
      this.usersignin.controls.role.touched
    );
  }

  ngOnInit(): void {
    this.destination$.titlehide();
  }

  onSignInClicked() {
    console.log('sign in btn clicked!');

    if (this.usersignin.invalid) {
      this.usersignin.markAllAsTouched();
      alert('PLease fill all details correctly!');
    } else {
      const formvalues = this.usersignin.getRawValue();

      const userData = {
        username: formvalues.username!,
        password: formvalues.password!,
        role: formvalues.role!,
      };
      this.api$.createUser(userData).subscribe({
        next: (res) => {
          alert('User created successfully!');
          this.usersignin.reset();
          this.router.navigate(['dashboard'], { relativeTo: this.route });
        },
        error: (err) => {
          console.error('Error during signup:', err);
          alert('something went wrong!');
        },
      });
    }
  }
}
