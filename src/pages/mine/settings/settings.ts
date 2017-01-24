/**
 * Created by russell on 2016/12/19.
 */
import {Component} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {Utils} from "../../../services/utils";
import {ChangePassWord} from "../../changePassWord/changePassWord";
import {AboutUs} from "../aboutUs/aboutUs";
@Component({
  selector: 'settings',
  templateUrl: 'settings.html'
})
export class Settings {

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public httpService: HirerHttpService) {

  }

  aboutUs() {
    this.navCtrl.push(AboutUs);
  }

  changePass() {
    this.navCtrl.push(ChangePassWord);
  }

  logOut() {
    this.httpService.logout().subscribe(() => {
      this.httpService.isLogin = false;
    }, err => {
      this.util.showAlertMsg(err);
    });
  }
}
