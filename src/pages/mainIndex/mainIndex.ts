/**
 * Created by russell on 2016/12/9.
 */
import {Component} from "@angular/core";
import {NavController, Slides} from "ionic-angular";
import {HirerHttpService} from "../../services/hirer-http-service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'hirer-main',
  templateUrl: 'mainIndex.html'
})

//todo: 数据
export class MainIndex {

  constructor(public navCtrl: NavController,
              public httpService: HirerHttpService) {

  }

  mySlideOptions = {
    pager: true,
    autoplay: 2000,
    initialSlide: 3,
    loop: true,
    speed: 300,
  };

  onClickNotices() {

  }

  onClickItem(pageIndex: number) {

    if (this.httpService.isLogin) {

      switch (pageIndex) {
        case 1:
          // this.navCtrl.setRoot();
          break;

        case 2:
          // this.navCtrl.push();
          break;

        case 3:
          // this.navCtrl.push();
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
