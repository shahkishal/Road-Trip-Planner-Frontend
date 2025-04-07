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
  roleOptions = ['User', 'Admin'];

  constructor(
    private destination$: DestinationService,
    private api$: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  usersignup = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
    roles: new FormControl<string[]>([], { validators: [Validators.required] }),
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
      this.usersignup.controls.roles.invalid &&
      this.usersignup.controls.roles.touched
    );
  }

  ngOnInit(): void {
    this.destination$.titlehide();
  }

  onRoleChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedRoles = this.usersignup.get('roles')?.value || [];

    if (input.checked) {
      if (!selectedRoles.includes(input.value)) {
        selectedRoles.push(input.value);
      }
    } else {
      const index = selectedRoles.indexOf(input.value);
      if (index > -1) {
        selectedRoles.splice(index, 1);
      }
    }

    this.usersignup.get('roles')?.setValue(selectedRoles);
    this.usersignup.get('roles')?.markAsTouched();
  }

  get rolesIsInvalid() {
    return (
      this.usersignup.controls.roles.invalid &&
      this.usersignup.controls.roles.touched
    );
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
        roles: formvalues.roles!,
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
