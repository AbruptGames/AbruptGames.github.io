import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AbruptValleyDownloadComponent } from './abrupt-valley-download/abrupt-valley-download.component';
import {AppRoutingModule} from "./route/route.module";
import { AbruptValleyDocumentationComponent } from './wiki/abrupt-valley-documentation.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {HttpClientModule} from "@angular/common/http";
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AbruptValleyDownloadComponent,
    AbruptValleyDocumentationComponent,
    LeaderboardComponent,
    GamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
