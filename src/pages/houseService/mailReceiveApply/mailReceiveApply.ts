/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {ModalController, NavController, LoadingController} from "ionic-angular";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {Utils} from "../../../services/utils";
import {ItemModal} from "../../modals/itemModal";
@Component({
  selector: 'mailReceiveApply',
  templateUrl: 'mailReceiveApply.html'
})
export class MailReceiveApply implements OnInit {

  public formDetail: any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.formDetail = {
      mailCompany: '',
      mailNo: '',
      masterName: this.httpService.accountInfo.name || '',
      masterSex: this.httpService.accountInfo.gender || true,
      masterPhoneNo: this.httpService.accountInfo.mobiPhone || '',
      masterAddress: ''
    };
  }

  ngOnInit() {
    if (this.httpService.accountInfo.houseid) {
      this.httpService.getRentHouseInfo(this.httpService.accountInfo.houseid + '').subscribe(data => {
        if (data) {
          this.formDetail.masterAddress = data.name;
        }
      }, err => {
        this.util.showAlertMsg(err);
      });
    }
  }

  changePhoneNo() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系电话', formDetail: this.formDetail});
    modal.present();
  }

  changeName() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系人', formDetail: this.formDetail});
    modal.present();
  }

  onClickSubmit() {

    let loader = this.loadingCtrl.create({content: "正在提交..."});
    loader.present();
    this.httpService.mailApply(this.formDetail, '').subscribe(() => {
      loader.dismiss();
      this.navCtrl.pop();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

}
