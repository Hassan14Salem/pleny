import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../shared/components/error/error.component';
import { authGuardGuard } from '../shared/guards/auth-guard.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'Auth', redirectTo: 'Auth/login', pathMatch: 'full' },  // Redirect empty path to login
  { path: 'login', canActivate: [authGuardGuard], component: LoginComponent },  // Apply guard to login route
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
