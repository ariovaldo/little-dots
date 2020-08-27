import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {JogadoresModule} from './jogadores';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JogadoresModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
