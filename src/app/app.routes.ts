import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Painelusuario } from './components/painelusuario/painelusuario';
import { Paineladmin } from './components/paineladmin/paineladmin';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'painel',
    component: Painelusuario,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: Paineladmin,
    canActivate: [authGuard]
  },
];
