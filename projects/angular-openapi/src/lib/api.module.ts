import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';

import { ApiComponent } from './api.component';
import { ApiResourceComponent } from './api-resource/api-resource.component';
import { ApiResourceViewComponent } from './api-resource-view/api-resource-view.component';
import { ApiRoutingModule } from "./api-routing.module";

@NgModule({
  declarations: [
    ApiComponent,
    ApiResourceComponent,
    ApiResourceViewComponent
  ],
  imports: [
    CommonModule,
    ApiRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule
  ],
})
export class ApiModule { }
