import {Component} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {Utils} from "../../services/utils";
import {HirerHttpService} from "../../services/hirer-http-service";

declare var md5;

@Component({
  selector: 'changePassWord',
  templateUrl: 'changePassWord.html'
})
export class ChangePassWord {

  public oldpwd: string;
  public newpwd: string;
  public newpwd1: string;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.oldpwd = '';
    this.newpwd = '';
    this.newpwd1 = '';
  }

  onClickChange() {


    if (!this.oldpwd) {
      this.util.showAlertMsg('请输入旧密码.');
      return false;
    }

    if (!this.newpwd) {
      this.util.showAlertMsg('请输入新密码.');
      return false;
    }

    if (!this.newpwd1) {
      this.util.showAlertMsg('请输入确认密码.');
      return false;
    }

    if (this.newpwd != this.newpwd1) {
      this.util.showAlertMsg('两次新密码不一致.');
      return false;
    }


    let loader = this.loadingCtrl.create({content: "提交中..."});
    loader.present();

    this.httpService.saveNewPass(this.oldpwd, this.newpwd).subscribe(() => {
      loader.dismiss();
    }, error => {
      if (error == '请登录') {
        loader.dismiss();
        this.navCtrl.pop();
        this.httpService.isLogin = false;
        this.util.showAlertMsg('修改密码成功，请重新登录');
      } else {
        loader.dismiss();
        this.util.showAlertMsg(error);
      }
    });

  }
}
