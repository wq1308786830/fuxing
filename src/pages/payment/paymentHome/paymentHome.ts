/**
 * Created by russell on 2016/12/9.
 */
import {Component} from "@angular/core";
import {NavController, Slides} from "ionic-angular";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {PropertyCosts} from "../propertyCosts/propertyCosts";
import {WaterCosts} from "../waterCosts/waterCosts";
import {ElectricCosts} from "../electricCosts/electricCosts";
import {NetCosts} from "../netCosts/netCosts";
import {RoomCosts} from "../roomCosts/roomCosts";
import {Utils} from "../../../services/utils";

@Component({
  selector: 'paymentHome',
  templateUrl: 'paymentHome.html'
})

//todo: 数据
export class PaymentHome {

  mySlideOptions = {
    pager: true,
    autoplay: 2000,
    initialSlide: 1,
    loop: true,

  };

  constructor(public navCtrl: NavController,
              public util: Utils,
              public httpService: HirerHttpService) {

  }

  onClickItem(pageIndex: number) {

    if (this.httpService.accountInfo.houseid) {
      switch (pageIndex) {
        case 1:
          this.navCtrl.push(PropertyCosts);
          break;

        case 2:
          this.navCtrl.push(WaterCosts);
          break;

        case 3:
          this.navCtrl.push(ElectricCosts);
          break;

        case 4:
          this.navCtrl.push(NetCosts);
          break;

        case 5:
          this.navCtrl.push(RoomCosts);
          break;

        default:
          break;
      }
    } else {
      this.util.showAlertMsg('您尚未租房，无法继续操作。');
    }
  }

}
