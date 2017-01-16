/**
 * Created by russell on 2016/12/19.
 */
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {PayRecord} from "../payRecord/payRecord";
import {FaultRepair} from "../../faultRepair/faultRepair";
import {Cleaning} from "../../houseService/cleaning/cleaning";
import {Settings} from "../settings/settings";
import {MyMsg} from "../myMsg/myMsg";
import {MyContract} from "../myContract/myContract";
import {MyInfo} from "../myInfo/myInfo";
import {MakerInfo} from "../../../beans/beans";
import {HirerHttpService} from "../../../services/hirer-http-service";
@Component({
  selector: 'mineNav',
  templateUrl: 'mineNav.html'
})
export class MineNav {

  public accountInfo: MakerInfo;

  constructor(public navCtrl: NavController,
              public httpService: HirerHttpService) {
    this.accountInfo = this.httpService.accountInfo;
  }

  goItem(navIndex: number) {
    switch (navIndex) {
      case 1:
        this.navCtrl.push(MyInfo);
        break;
      case 2:
        this.navCtrl.push(PayRecord);
        break;
      case 3:
        this.navCtrl.push(FaultRepair, {isList: true});
        break;
      case 4:
        this.navCtrl.push(Cleaning, {isList: true});
        break;
      case 5:
        this.navCtrl.push(MyContract);
        break;
      case 6:
        this.navCtrl.push(MyMsg);
        break;
      case 7:
        this.navCtrl.push(Settings);
        break;
      default:
        break;
    }
  }

  uploadThumbnail() {

  }
}
