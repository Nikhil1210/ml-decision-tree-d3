import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModelService} from './model/model.service';
import {DashboardService} from './dashboard/dashboard.service';

@NgModule({
  providers: [
    ModelService,
    DashboardService
  ],
  declarations: []
})
export class ServicesModule { }
