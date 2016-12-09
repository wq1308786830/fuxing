import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {MainIndex} from "../pages/mainIndex/mainIndex";
import {MainTabs} from "../pages/mainTabs/mainTabs";
import {HirerHttpService} from "../services/hirer-http-service";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {Utils} from "../services/utils";

@NgModule({
  declarations: [
    MyApp,
    MainTabs,
    MainIndex,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      mode: "ios",
      backButtonText: "",
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainTabs,
    MainIndex,
    LoginPage,
    RegisterPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HirerHttpService,
    Utils
  ]
})
export class AppModule {
}
