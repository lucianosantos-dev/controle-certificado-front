import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { Painelusuario } from './components/painelusuario/painelusuario';
import { Paineladmin } from './components/paineladmin/paineladmin';
import { authGuard } from './guards/auth.guard';
import { Minhassolicitacoes } from './components/minhassolicitacoes/minhassolicitacoes';

export const routes: Routes = [

  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },

  {
    path: 'register',
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
  {
    path: 'minhas-solicitacoes',
    component: Minhassolicitacoes,
    canActivate: [authGuard]
  }
];
