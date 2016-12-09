import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController, Platform} from "ionic-angular";
import {Utils} from "../../services/utils";
import {HirerHttpService} from "../../services/hirer-http-service";
import {RegisterPage} from "../register/register";

declare var md5;

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  public user: any;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public platform: Platform,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.user = {};
  }

  ngOnInit() {
    let phoneNo = localStorage.getItem("phoneNo");
    if (phoneNo) {
      this.user.phoneNo = phoneNo;
    }
  }

  onClickLogin() {
    if (this.user.phoneNo && this.user.password) {

      let loader = this.loadingCtrl.create({
        content: "登录中..."
      });
      loader.present();

      this.httpService.login(this.user).subscribe(info => {

        if (info) {
          localStorage.setItem("phoneNo", this.user.phoneNo);
          this.httpService.accountInfo = info;
          this.httpService.isLogin = true;
          this.navCtrl.pop();
        }
        loader.dismiss();

      }, error => {
        loader.dismiss();
        if (error === "ErrorPassword") {
          this.util.showAlertMsg('您输入的用户名和密码不匹配，请重新输入.');
        } else {
          this.util.showAlertMsg('网络连接出现错误，请稍后再试.');
        }
      });

    } else {
      this.util.showAlertMsg('用户名和密码不能为空.');
    }
  }

  onClickRegist() {
    this.navCtrl.push(RegisterPage);
  }
}
