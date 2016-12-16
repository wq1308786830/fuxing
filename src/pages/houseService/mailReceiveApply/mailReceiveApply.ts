/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {ModalController, NavController} from "ionic-angular";
import {ItemModal} from "../../modals/itemModal";
@Component({
  selector: 'mailReceiveApply',
  templateUrl: 'mailReceiveApply.html'
})
export class MailReceiveApply implements OnInit {

  public formDetail: any;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController) {
    this.formDetail = {
      mailCompany: '',
      mailNo: '',
      masterName: '',
      masterPhoneNo: '',
      masterAddress: '',
    }
  }

  ngOnInit() {
    this.formDetail = {
      repairContent: '',
      masterName: '李阳',
      masterPhoneNo: '1381818181',
      masterAddress: '于都大楼于都大楼',
      changeDate: '21-11-2016',
      masterAtHome: false
    }
  }

  changePhoneNo() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系电话'});
    modal.present();
  }

  changeName() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系人'});
    modal.present();
  }

  onClickSubmit() {
    this.navCtrl.pop();
  }

}
