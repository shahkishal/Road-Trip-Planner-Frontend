import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Notification, NotificationService } from './notification.service';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  notification: Notification = { type: 'success', message: '' };
  show = false;

  constructor(private notify: NotificationService) {}

  ngOnInit() {
    this.notify.notification$.subscribe((noti) => {
      this.notification = noti;
      this.show = true;

      setTimeout(() => (this.show = false), 3000);
    });
  }
}
