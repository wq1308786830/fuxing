/**
 * Created by russell on 2016/12/19.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {Utils} from "../../../services/utils";
import {MoneyPayInfo} from "../../../beans/beans";
@Component({
  selector: 'payRecord',
  templateUrl: 'payRecord.html'
})
export class PayRecord implements OnInit {

  payRecord = 'electricRecord';
  public feeType: number;
  public feeList: MoneyPayInfo[];
  public currPage1: number;
  public currPage2: number;
  public currPage3: number;
  public currPage4: number;
  public currPage5: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.feeType = 3;
    this.feeList = [];
    this.currPage1 = 1;
    this.currPage2 = 1;
    this.currPage3 = 1;
    this.currPage4 = 1;
    this.currPage5 = 1;
  }

  ngOnInit(): void {
    this. segmentChanged();
  }

  getPaymentList(feetype: number) {
    this.feeList = [];
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getPayHistoryList(feetype, 1).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.feeList = data;
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

  getPaymentInfinite(feetype: number, ev: any, currPage: number) {
    this.httpService.getPayHistoryList(feetype, currPage).subscribe(data => {
      if (data) {
        this.feeList = this.feeList.concat(data);
      }
      ev.complete();
    }, err => {
      ev.complete();
    });
  }


  segmentChanged() {

    if (!this.httpService.accountInfo.houseid) {
      return;
    }
    switch (this.payRecord) {
      case 'electricRecord':
        this.feeType = 3;
        this.getPaymentList(this.feeType);
        break;

      case 'waterRecord':
        this.feeType = 2;
        this.getPaymentList(this.feeType);
        break;
      case 'netRecord':
        this.feeType = 4;
        this.getPaymentList(this.feeType);
        break;
      case 'propertyRecord':
        this.feeType = 1;
        this.getPaymentList(this.feeType);
        break;
      case 'roomRecord':
        this.feeType = 5;
        this.getPaymentList(this.feeType);
        break;

      default:
        break;
    }
  }

  doInfinite(ev) {
    if (!this.httpService.accountInfo.houseid) {
      return;
    }
    switch (this.payRecord) {
      case 'electricRecord':
        this.feeType = 3;
        this.getPaymentInfinite(this.feeType, ev, ++this.currPage3);
        break;
      case 'waterRecord':
        this.feeType = 2;
        this.getPaymentInfinite(this.feeType, ev, ++this.currPage2);
        break;
      case 'netRecord':
        this.feeType = 4;
        this.getPaymentInfinite(this.feeType, ev, ++this.currPage4);
        break;
      case 'propertyRecord':
        this.feeType = 1;
        this.getPaymentInfinite(this.feeType, ev, ++this.currPage1);
        break;
      case 'roomRecord':
        this.feeType = 5;
        this.getPaymentInfinite(this.feeType, ev, ++this.currPage5);
        break;

      default:
        break;
    }
  }
}
