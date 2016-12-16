/**
 * Created by russell on 2016/12/9.
 */
import {Component} from "@angular/core";
import {NavController, Slides} from "ionic-angular";
import {HirerHttpService} from "../../services/hirer-http-service";
import {LoginPage} from "../login/login";
import {AnnounceList} from "../announcement/announceList/announceList";
import {PaymentHome} from "../payment/paymentHome/paymentHome";
import {FaultRepair} from "../faultRepair/faultRepair";
import {HouseHome} from "../houseService/houseHome/houseHome";

@Component({
  selector: 'hirer-main',
  templateUrl: 'mainIndex.html'
})

//todo: 数据
export class MainIndex {

  mySlideOptions = {
    pager: true,
    autoplay: 2000,
    initialSlide: 1,
    loop: true,

  };

  constructor(public navCtrl: NavController,
              public httpService: HirerHttpService) {

  }

  onClickNotices() {

  }

  onClickItem(pageIndex: number) {

    if (!this.httpService.isLogin) {

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

  onClickDetail() {

    if (this.httpService.isLogin) {


    } else {
      this.navCtrl.push(LoginPage);
    }

  }

}
