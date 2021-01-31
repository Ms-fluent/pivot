import {BrowserModule, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import * as hammer from 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MsPivotModule} from './pivot';


@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {direction: hammer.DIRECTION_ALL},
    pan: {direction: hammer.DIRECTION_HORIZONTAL}
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HammerModule,
    AppRoutingModule, MsPivotModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
