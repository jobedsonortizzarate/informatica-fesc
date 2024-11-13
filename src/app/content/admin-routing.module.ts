import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { QuienessomosComponent } from './quienessomos/quienessomos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
     
      {
        path: 'quienessomos',
        data: {
          title: 'Quienes somos',
          breadcrumbs: [
            {
              text: 'Quienes somos',
              active: true,
            }
          ],
        },
        component: QuienessomosComponent,
      },
      {
        path: '',
        redirectTo: 'quienessomos',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
