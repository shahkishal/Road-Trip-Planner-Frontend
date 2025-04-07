import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../shared/destination.service';
import { ApiService } from '../../shared/api.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(
    private destination$: DestinationService,
    private api$: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  usersignup = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
    role: new FormControl([], { validators: [Validators.required] }),
  });

  get usernameIsInvalid() {
    return (
      this.usersignup.controls.username.invalid &&
      this.usersignup.controls.username.touched
    );
  }

  get passwordIsInvalid() {
    return (
      this.usersignup.controls.password.invalid &&
      this.usersignup.controls.password.touched
    );
  }

  get roleIsInvalid() {
    return (
      this.usersignup.controls.role.invalid &&
      this.usersignup.controls.role.touched
    );
  }

  ngOnInit(): void {
    this.destination$.titlehide();
  }

  onSignUpClicked() {
    console.log('sign up btn clicked!');
    console.log('values', this.usersignup.value);

    if (this.usersignup.invalid) {
      this.usersignup.markAllAsTouched();
      alert('PLease fill all details correctly!');
    } else {
      const formvalues = this.usersignup.getRawValue();

      const userData = {
        username: formvalues.username!,
        password: formvalues.password!,
        role: formvalues.role!,
      };
      this.api$.createUser(userData).subscribe({
        next: (res) => {
          alert('User created successfully!');
          this.usersignup.reset();
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
