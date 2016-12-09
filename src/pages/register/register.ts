import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController, Platform, App, ViewController} from "ionic-angular";
import {Utils} from "../../services/utils";
import {HirerHttpService} from "../../services/hirer-http-service";

declare var md5;

@Component({
  selector: 'regist-page',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  public user: any;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public appCtrl: App,
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

  onClickRegist() {
    if (this.user.phoneNo && this.user.password) {

      let loader = this.loadingCtrl.create({
        content: "注册中..."
      });
      loader.present();

      this.httpService.regist(this.user).subscribe(info => {

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
          this.util.showAlertMsg('您输入的账号和密码不匹配，请重新输入.');
        } else {
          this.util.showAlertMsg('网络连接出现错误，请稍后再试.');
        }
      });

    } else {
      this.util.showAlertMsg('用户名和密码不能为空.');
    }
  }
}
