import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [],
  providers: [],
  bootstrap: []
})
export class AppModule {
    static SERVER_API_URL = 'localhost:8000'; //fixme: you need to change this

}
