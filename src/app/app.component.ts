import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  // ActivatedRoute,
  // NavigationEnd,
  // Router,
  RouterOutlet,
} from '@angular/router';
// import { ButtonsComponent } from './buttons/buttons.component';
import { DestinationService } from './shared/destination.service';
// import { Modal } from 'bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'First-angular-p';

  public showTitle: any = true;

  constructor(
    // private router: Router,
    private destination$: DestinationService,
    // private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    // this.router.events.subscribe(() => {
    //   this.showTitle = this.router.url !== 'add/destination';
    // });
  }
  ngOnInit() {
    // console.log(this.route);

    this.destination$.showTitle.subscribe({
      next: (res: any) => {
        this.showTitle = res;
        this.cdr.detectChanges();
      },
    });
  }
}
