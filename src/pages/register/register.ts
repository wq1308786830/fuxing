import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController, Platform, ViewController} from "ionic-angular";
import {Utils} from "../../services/utils";
import {HirerHttpService} from "../../services/hirer-http-service";

declare var md5;

@Component({
  selector: 'regist-page',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {

  public user: any;
  public password2: string;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public platform: Platform,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.user = {};
    this.password2 = '';
  }

  ngOnInit() {
    let phoneNo = localStorage.getItem("phoneNo");
    if (phoneNo) {
      this.user.phoneNo = phoneNo;
    }
  }

  onClickRegist() {

    if (!this.user.username) {
      this.util.showAlertMsg('请输入您的姓名.');
      return false;
    }

    if (!this.user.phoneNo && !/^1[0-9]{10}$/.test(this.user.phoneNo)) {
      this.util.showAlertMsg('请输入手机号.');
      return false;
    }

    if (!this.user.password) {
      this.util.showAlertMsg('请输入密码.');
      return false;
    }

    if (!this.password2) {
      this.util.showAlertMsg('请输入确认密码.');
      return false;
    }

    if (this.user.password != this.password2) {
      this.util.showAlertMsg('两次密码不一致.');
      return false;
    }


    let loader = this.loadingCtrl.create({content: "注册中..."});
    loader.present();

    this.httpService.regist(this.user).subscribe(info => {

      localStorage.setItem("phoneNo", this.user.phoneNo);
      // this._cookieService.put('JSESSIONID', 'e7mmdb6vupvkzjqig2an2fua');
      this.httpService.token = info;
      this.httpService.isLogin = true;
      this.navCtrl.pop();

      loader.dismiss();

    }, error => {
      loader.dismiss();
      this.util.showAlertMsg(error);
    });

  }
}
