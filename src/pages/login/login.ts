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

      let loader = this.loadingCtrl.create({content: "登录中..."});
      loader.present();

      this.httpService.login(this.user).subscribe(info => {
        this.httpService.token = info;
        this.getAccountInfo();
        localStorage.setItem("phoneNo", this.user.phoneNo);
        this.httpService.isLogin = true;
        this.navCtrl.pop();

        loader.dismiss();

      }, error => {
        loader.dismiss();
        if (error != "error") {
          this.util.showAlertMsg(error);
        } else {
          this.util.showAlertMsg('未知错误，请稍后再试.');
        }
      });

    } else {
      this.util.showAlertMsg('用户名和密码不能为空.');
    }
  }

  onClickRegist() {
    this.navCtrl.push(RegisterPage);
  }

  getAccountInfo() {
    this.httpService.getUserInfo().subscribe(data => {
      if (data) {
        this.httpService.accountInfo = data;
      } else {
        this.util.showAlertMsg("获取用户信息失败,请重新登录");
      }
    }, err => {
      this.util.showAlertMsg("获取用户信息失败,请重新登录");
    });
  }
}
