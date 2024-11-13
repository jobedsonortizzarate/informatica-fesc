/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AuthComponent } from './auth.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

/* Containers */

/* Routes */
export const ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'inicio',
        canActivate: [],
        component: InicioComponent,
        data: {
          title: 'Inicio seción',
        },
      },
      {
        title: 'Registro de usuarios',
        path: 'registroUsuario',
        canActivate: [],
        component: RegistroUsuarioComponent,
        data: {
          title: 'Registro de usuario',
          breadcrumbs: [
            {
              text: 'Registro',
              active: true,
            },
          ]
        },
        
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
