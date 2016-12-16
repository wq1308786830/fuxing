/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {ModalController} from "ionic-angular";
import {ItemModal} from "../../modals/itemModal";
import {RatingModal} from "../../modals/ratingModal";
@Component({
  selector: 'cleaning',
  templateUrl: 'cleaning.html'
})
export class Cleaning implements OnInit {

  cleaning = 'cleaningForm';
  public formDetail: any;

  constructor(public modalCtrl: ModalController) {
    this.formDetail = {
      cleanContent: '',
      masterName: '',
      masterSex: 0,
      masterPhoneNo: '',
      masterAddress: '',
      changeDate: '',
      masterAtHome: false,
      comment: ''
    }
  }

  ngOnInit() {
    this.formDetail = {
      cleanContent: '',
      masterName: '李阳',
      masterSex: 0,
      masterPhoneNo: '1381818181',
      masterAddress: '于都大楼',
      changeDate: '2016-11-21',
      masterAtHome: false,
      comment: ''
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

  goPayMoney() {

  }

  goRating(item: any) {
    //todo:此处传入评价项参数，必须包括是否已评价的状态
    let modal = this.modalCtrl.create(RatingModal, {data: item});
    modal.present();
  }

  onClickSubmit() {

  }

}
