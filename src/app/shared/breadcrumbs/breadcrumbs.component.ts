import { ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from '../../models/routeData.model';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'sg-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  subscription: Subscription = new Subscription();
  breadcrumbs: Breadcrumb[] | any;

  constructor(
    public navigationService: NavigationService,
    private ref: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.subscription.add(
      this.navigationService.routeData$().subscribe((routeData) => {
        this.breadcrumbs = routeData.breadcrumbs;
        this.ref.markForCheck();
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
