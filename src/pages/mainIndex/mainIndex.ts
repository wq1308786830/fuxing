/**
 * Created by russell on 2016/12/9.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, Slides, LoadingController} from "ionic-angular";
import {HirerHttpService} from "../../services/hirer-http-service";
import {LoginPage} from "../login/login";
import {AnnounceList} from "../announcement/announceList/announceList";
import {PaymentHome} from "../payment/paymentHome/paymentHome";
import {FaultRepair} from "../faultRepair/faultRepair";
import {HouseHome} from "../houseService/houseHome/houseHome";
import {HouseDetail} from "../houseRent/houseDetail/houseDetail";
import {MyMsg} from "../mine/myMsg/myMsg";
import {GarDenStyleBean} from "../../beans/beans";

@Component({
  selector: 'hirer-main',
  templateUrl: 'mainIndex.html'
})

//todo: 数据
export class MainIndex implements OnInit{

  mySlideOptions = {
    pager: true,
    autoplay: 2000,
    initialSlide: 1,
    loop: true,

  };

  public gardenList: GarDenStyleBean[];

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public httpService: HirerHttpService) {
    this.gardenList = [];
  }

  ngOnInit(): void {
    let loading = this.loadingCtrl.create({content: "正在加载..."});
    loading.present();
    this.httpService.gardenListStyle().subscribe( data => {
      if (data) {
        this.gardenList = data;
      }
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }

  onClickNotices() {
    if (this.httpService.isLogin) {
      this.navCtrl.push(MyMsg);
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  onClickItem(pageIndex: number) {

    if (this.httpService.isLogin) {

      switch (pageIndex) {
        case 1:
          this.navCtrl.push(AnnounceList);
          break;

        case 2:
          this.navCtrl.push(PaymentHome);
          break;

        case 3:
          this.navCtrl.push(FaultRepair);
          break;
        case 4:
          this.navCtrl.push(HouseHome);
          break;

        default:
          break;
      }
    } else {
      this.navCtrl.push(LoginPage);
    }
  }

  onClickDetail(gardenid: number) {

    if (this.httpService.isLogin) {
      this.navCtrl.push(HouseDetail, {gardenid: gardenid});
    } else {
      this.navCtrl.push(LoginPage);
    }

  }

}
