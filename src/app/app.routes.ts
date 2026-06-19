import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Painelusuario } from './components/painelusuario/painelusuario';
import { Paineladmin } from './components/paineladmin/paineladmin';

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
    component: Painelusuario
  },
  {
    path: 'admin',
    component: Paineladmin
  },
];
