import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MemeDetailsComponent } from './memes/meme-details/meme-details.component';
import { MemeListComponent } from './memes/meme-list/meme-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MemeDetailsComponent,
    MemeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
