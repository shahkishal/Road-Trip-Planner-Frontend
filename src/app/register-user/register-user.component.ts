import { Component } from '@angular/core';
import { DestinationService } from '../shared/destination.service';

@Component({
  selector: 'app-register-user',
  imports: [],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
})
export class RegisterUserComponent {

  constructor(private destination$: DestinationService) {}
  
  onRegister() {
    console.log('regitered');
  }
}
