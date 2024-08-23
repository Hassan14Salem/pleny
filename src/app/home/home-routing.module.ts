import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../shared/components/error/error.component';
import { securedRoutesGuard } from '../shared/guards/secured-routes.guard';
import { ProductsComponent } from './components/products/products.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  { path: 'Home', redirectTo: 'Home/products', pathMatch: 'full' },  // Redirect empty path to products
  { path: 'products', canActivate: [securedRoutesGuard], component: ProductsComponent },  // Apply guard to products route
  { path: 'test', canActivate: [securedRoutesGuard], component: TestComponent },  // Apply guard to test route
  
    {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
