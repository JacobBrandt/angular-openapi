import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api.component';
import { ApiResourceViewComponent } from './api-resource-view/api-resource-view.component';

const routes: Routes = [
  {
    path: 'openapi', component: ApiComponent,
    children: [
      {path: 'resource', component: ApiResourceViewComponent, outlet: "api"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ApiRoutingModule { }
