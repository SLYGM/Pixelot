import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Component } from './tab1/tab1.component';

const routes: Routes = [
  {path: 'first-tab', component: Tab1Component},
  //  This is what path for tab2 would look like
  // {path: 'first-tab', component: Tab1Component},
  {path: '', redirectTo: '/first-tab', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
