import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DestinationService } from './shared/destination.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingSpinnerService } from './shared/loading-spinner.service';
import { NotificationsComponent } from './shared/notifications/notifications.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NzSpinModule, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'First-angular-p';

  public showTitle: any = true;

  constructor(
    private destination$: DestinationService,
    public loading$: LoadingSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.destination$.showTitle.subscribe({
      next: (res: any) => {
        this.showTitle = res;
        this.cdr.detectChanges();
      },
    });

    this.loading$.hide();
  }
}
