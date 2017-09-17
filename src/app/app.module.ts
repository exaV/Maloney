import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ShowsPage } from '../pages/shows/shows'
import { SavedPage } from '../pages/saved/saved';
import { TabsPage } from '../pages/tabs/tabs'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MaloneyService } from '../services/MaloneyService'
import { SavedShowsService } from '../services/SavedShowsService'


@NgModule({
  declarations: [
    MyApp,
    ShowsPage,
    SavedPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShowsPage,
    SavedPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MaloneyService,
    SavedShowsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
