import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbruptValleyDownloadComponent } from "../abrupt-valley-download/abrupt-valley-download.component";
import {AbruptValleyDocumentationComponent} from "../wiki/abrupt-valley-documentation.component";
import {LeaderboardComponent} from "../leaderboard/leaderboard.component";
import {GamesComponent} from "../games/games.component";

const routes: Routes = [
  { path: 'wiki', component: AbruptValleyDocumentationComponent },
  { path: 'abrupt-valley', component: AbruptValleyDownloadComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'games', component: GamesComponent },
  { path: '**', component: AbruptValleyDownloadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
