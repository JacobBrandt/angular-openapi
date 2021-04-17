import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from 'projects/angular-openapi/src/public-api';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'api'
  },
  {
    path: 'api', component: ApiComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
