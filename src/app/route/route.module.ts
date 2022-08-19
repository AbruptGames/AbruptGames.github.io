import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbruptValleyDownloadComponent } from "../abrupt-valley-download/abrupt-valley-download.component";
import {AbruptValleyDocumentationComponent} from "../abrupt-valley-documentation/abrupt-valley-documentation.component";

const routes: Routes = [
  { path: 'documentation', component: AbruptValleyDocumentationComponent },
  { path: 'abrupt-valley', component: AbruptValleyDownloadComponent },
  { path: '**', component: AbruptValleyDownloadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
