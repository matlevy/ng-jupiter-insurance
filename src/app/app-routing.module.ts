import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'quote', component: AppComponent },
  { path: ':lang/quote', component: AppComponent },
  { path: ':lang/quote/:id', component: AppComponent },
  { path: '', redirectTo: '/quote', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
