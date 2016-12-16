/**
 * Created by russell on 2016/12/9.
 */
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {MailReceive} from "../mailReceive/mailReceive";
import {Cleaning} from "../cleaning/cleaning";

@Component({
  selector: 'houseHome',
  templateUrl: 'houseHome.html'
})

//todo: 数据
export class HouseHome {

  mySlideOptions = {
    pager: true,
    autoplay: 2000,
    initialSlide: 1,
    loop: true,

  };

  constructor(public navCtrl: NavController,
              public httpService: HirerHttpService) {

  }

  onClickItem(pageIndex: number) {

    switch (pageIndex) {
      case 1:
        this.navCtrl.push(MailReceive);
        break;

      case 2:
        this.navCtrl.push(Cleaning);
        break;

      default:
        break;
    }
  }

}
