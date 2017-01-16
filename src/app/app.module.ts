import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {MainIndex} from "../pages/mainIndex/mainIndex";
import {MainTabs} from "../pages/mainTabs/mainTabs";
import {HirerHttpService} from "../services/hirer-http-service";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {Utils} from "../services/utils";
import {AnnounceList} from "../pages/announcement/announceList/announceList";
import {AnnounceDetail} from "../pages/announcement/announceDetail/announceDetail";
import {PaymentHome} from "../pages/payment/paymentHome/paymentHome";
import {PropertyCosts} from "../pages/payment/propertyCosts/propertyCosts";
import {WaterCosts} from "../pages/payment/waterCosts/waterCosts";
import {ElectricCosts} from "../pages/payment/electricCosts/electricCosts";
import {NetCosts} from "../pages/payment/netCosts/netCosts";
import {RoomCosts} from "../pages/payment/roomCosts/roomCosts";
import {FaultRepair} from "../pages/faultRepair/faultRepair";
import {HouseHome} from "../pages/houseService/houseHome/houseHome";
import {MailReceive} from "../pages/houseService/mailReceive/mailReceive";
import {ItemModal} from "../pages/modals/itemModal";
import {RatingModal} from "../pages/modals/ratingModal";
import {MailReceiveApply} from "../pages/houseService/mailReceiveApply/mailReceiveApply";
import {Cleaning} from "../pages/houseService/cleaning/cleaning";
import {HouseDetail} from "../pages/houseRent/houseDetail/houseDetail";
import {RentProtocolModal} from "../pages/houseRent/rentProtocolModal/rentProtocolModal";
import {BookingModal} from "../pages/houseRent/bookingModal/bookingModal";
import {MineNav} from "../pages/mine/mineNav/mineNav";
import {PayRecord} from "../pages/mine/payRecord/payRecord";
import {Settings} from "../pages/mine/settings/settings";
import {MyMsg} from "../pages/mine/myMsg/myMsg";
import {MyContract} from "../pages/mine/myContract/myContract";
import {MyInfo} from "../pages/mine/myInfo/myInfo";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {RentCosts} from "../pages/houseRent/roomCosts/roomCosts";
import {PaymentListModal} from "../pages/payment/modals/listModal";

@NgModule({
  declarations: [
    MyApp,
    MainTabs,
    MainIndex,
    LoginPage,
    RegisterPage,
    AnnounceList,
    AnnounceDetail,

    //houseRent
    HouseDetail,
    RentCosts,

    //modals
    ItemModal,
    RatingModal,
    RentProtocolModal,
    BookingModal,

    //payment
    PaymentHome,
    PropertyCosts,
    WaterCosts,
    ElectricCosts,
    NetCosts,
    RoomCosts,
    PaymentListModal,

    //fault repair
    FaultRepair,

    //houseService
    HouseHome,
    MailReceive,
    MailReceiveApply,
    Cleaning,

    //mine
    MineNav,
    PayRecord,
    Settings,
    MyMsg,
    MyContract,
    MyInfo
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
    RegisterPage,
    AnnounceList,
    AnnounceDetail,

    //houseRent
    HouseDetail,
    RentCosts,

    //modals
    ItemModal,
    RatingModal,
    RentProtocolModal,
    BookingModal,

    //payment
    PaymentHome,
    PropertyCosts,
    WaterCosts,
    ElectricCosts,
    NetCosts,
    RoomCosts,
    PaymentListModal,

    //fault repair
    FaultRepair,

    //houseService
    HouseHome,
    MailReceive,
    MailReceiveApply,
    Cleaning,

    //mine
    MineNav,
    PayRecord,
    Settings,
    MyMsg,
    MyContract,
    MyInfo
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HirerHttpService,
    Utils,
    CookieService
  ]
})
export class AppModule {
}
