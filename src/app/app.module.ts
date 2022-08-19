import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AbruptValleyDownloadComponent } from './abrupt-valley-download/abrupt-valley-download.component';
import {AppRoutingModule} from "./route/route.module";
import { AbruptValleyDocumentationComponent } from './abrupt-valley-documentation/abrupt-valley-documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AbruptValleyDownloadComponent,
    AbruptValleyDocumentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
