import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from '../store/store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forRoot({counter : counterReducer})

  ]
})
export class HomeModule { }
