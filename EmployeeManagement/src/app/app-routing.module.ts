import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmployComponent } from './components/add-employ/add-employ.component';
import { EmployListComponent } from './components/employ-list/employ-list.component';
import { UpdateEmployComponent } from './components/update-employ/update-employ.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-employ' },
  { path: 'add-employ', component: AddEmployComponent },
  { path: 'update-employ/:id', component: UpdateEmployComponent },
  { path: 'employ-list', component: EmployListComponent }
];
const routing = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
