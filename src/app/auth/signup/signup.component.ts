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
import { LoadingSpinnerService } from '../../shared/loading-spinner.service';
import { NotificationService } from '../../shared/notifications/notification.service';

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
    private route: ActivatedRoute,
    private loading$: LoadingSpinnerService,
    private notify$: NotificationService
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
    this.loading$.hide();
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
    this.loading$.show();

    if (this.usersignup.invalid) {
      this.loading$.hide();
      this.usersignup.markAllAsTouched();
      // alert('PLease fill all details correctly!');
      this.notify$.show('warning', 'PLease fill all details correctly!');
    } else {
      const formvalues = this.usersignup.getRawValue();

      var userData = {
        username: formvalues.username!,
        password: formvalues.password!,
        roles: formvalues.roles!,
      };

      console.log(userData);
      console.log(JSON.stringify(userData));

      // this.api$.createUser(userData).subscribe(
      //   (response) => {
      //     console.log(userData);
      //     alert('User created successfully!');
      //     this.usersignup.reset();
      //     this.router.navigate(['dashboard'], { relativeTo: this.route });
      //   },
      //   (error) => {
      //     console.error('something went wrongddddd!!!');
      //   }
      // );

      if (userData) {
        this.api$.createUser(userData).subscribe((res) => {
          const backend = res;
          console.log('response received vfrom backerdnd', res);
          console.log('response received vfrom backerdnd', backend);

          console.log(userData);
          // alert('User created successfully!');
          this.notify$.show('success', 'User created successfully!');
          this.loading$.hide();
          this.usersignup.reset();
          this.router.navigate(['sign-in']);
        });
      } else {
        // alert('user could not be registered!! Please try again.');
        this.notify$.show(
          'error',
          'User could not be registered!! Please try again.'
        );
      }
    }
  }

  onlogin() {
    this.router.navigate(['sign-in']);
  }
}
