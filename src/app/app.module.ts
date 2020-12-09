import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MsPivotModule} from './pivot/pivot.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MsPivotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
