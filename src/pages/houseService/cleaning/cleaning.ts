/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {ModalController, LoadingController, NavParams} from "ionic-angular";
import {ItemModal} from "../../modals/itemModal";
import {RatingModal} from "../../modals/ratingModal";
import {Utils} from "../../../services/utils";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {CleanInfo} from "../../../beans/beans";
@Component({
  selector: 'cleaning',
  templateUrl: 'cleaning.html'
})
export class Cleaning implements OnInit {

  cleaning = 'cleaningForm';
  public formDetail: any;
  private currPage: number;

  public cleanList: CleanInfo[];

  constructor(public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public httpService: HirerHttpService) {
    params.get('isList') ? this.cleaning = 'cleaningList' : this.cleaning = 'cleaningForm';
    this.formDetail = {
      cleanContent: '',
      masterName: this.httpService.accountInfo.name || '',
      masterSex: this.httpService.accountInfo.gender || true,
      masterPhoneNo: this.httpService.accountInfo.mobiPhone || '',
      masterAddress: '',
      changeDate: '2016-01-01T00:00:00+01:00',
      masterAtHome: false,
      comment: ''
    };
    this.currPage = 0;
  }

  ngOnInit() {
    this.segmentChanged();
  }

  changePhoneNo() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系电话', formDetail: this.formDetail});
    modal.present();
  }

  changeName() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系人', formDetail: this.formDetail});
    modal.present();
  }

  goPayMoney(data: CleanInfo) {
    let loader = this.loadingCtrl.create({content: "正在提交..."});
    loader.present();
    this.httpService.payClean(data.id).subscribe(() => {
      loader.dismiss();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg("提交失败，请重试");
    });
  }


  goRating(item: any) {
    let modal = this.modalCtrl.create(RatingModal, {data: item, type: 'clean'});
    modal.present();
  }

  onClickSubmit() {
    let dateArr = this.formDetail.changeDate.split('T');
    this.formDetail.changeDate = dateArr[0] + ' ' + dateArr[1].split('+')[0].substring(0, 5);

    let loader = this.loadingCtrl.create({content: "正在提交..."});
    loader.present();
    this.httpService.cleanApply(this.formDetail, '').subscribe(() => {
      loader.dismiss();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg("提交失败，请重试");
    });
  }

  segmentChanged() {

    switch (this.cleaning) {
      case 'cleaningForm':
        this.httpService.getRentHouseInfo(this.httpService.accountInfo.houseid.toString()).subscribe(data => {
          this.formDetail.masterAddress = data.name;
        }, err => {
          this.util.showAlertMsg("获取房间地址失败");
        });
        break;
      case 'cleaningList':
        let loader = this.loadingCtrl.create({content: "正在加载..."});
        loader.present();
        this.httpService.getCleanApplyList(0).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.cleanList = data;
          }
        }, err => {
          loader.dismiss();
          this.util.showAlertMsg("获取数据失败，请重试");
        });
        break;
      default:
        break;
    }
  }

  doInfinite(ev) {
    if (this.cleaning === 'cleaningList') {
      this.httpService.getCleanApplyList(++this.currPage).subscribe(data => {
        ev.complete();
        if (data) {
          for (let item of data) {
            this.cleanList.push(item);
          }
        }
      }, err => {
        ev.complete();
      });
    } else {
      ev.complete();
    }
  }

}
