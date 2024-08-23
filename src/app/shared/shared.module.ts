import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { error } from 'console';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ]
})
export class SharedModule { }
