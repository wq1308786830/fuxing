/**
 * Created by russell on 2017/1/9.
 */
import {Component} from "@angular/core";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {LoadingController, NavParams, NavController} from "ionic-angular";
import {Utils} from "../../../services/utils";
@Component({
  selector: 'unrent',
  templateUrl: 'unrent.html'
})
export class Unrent {

  public formData: any;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public loadingCtrl: LoadingController,
              public util: Utils,
              private httpService: HirerHttpService) {
    this.formData = {
      bankCardNo: '',
      bankCardName: '',
      bankCardUserName: '',
      bankCardUserId: ''
    }
  }

  onClickSubmit() {
    let loader = this.loadingCtrl.create({content: "登录中..."});
    loader.present();
    this.httpService.doUnrent(this.formData).subscribe(() => {
      loader.dismiss();
      this.util.showAlertMsg('提交成功.');
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg('提交失败，请稍后再试.');
    });
  }
}
