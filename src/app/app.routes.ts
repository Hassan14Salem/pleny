import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/components/error/error.component';

export const routes: Routes = [
    {path:'',redirectTo:'Auth',pathMatch:'full'},
    {path:'Auth', loadChildren : () => import('./auth/auth.module').then(a => a.AuthModule)},
  
    {path:'Home', loadChildren : () => import('./home/home.module').then(h => h.HomeModule)},
    
    {path:'**',component:ErrorComponent}
];
