/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {Utils} from "../../../services/utils";
import {MoneyFeeInfo, MakerInfo, PayBillInfo} from "../../../beans/beans";

declare var HNBridge;
@Component({
  selector: 'electricCosts',
  templateUrl: 'electricCosts.html'
})
export class ElectricCosts implements OnInit {

  private static E_FEE_ELETRIC: number = 3;

  public feeInfo: MoneyFeeInfo;
  public userInfo: MakerInfo;
  public formData: any;
  public payBillInfo: PayBillInfo;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.feeInfo = new MoneyFeeInfo;
    this.userInfo = this.httpService.accountInfo;
    this.payBillInfo = new PayBillInfo;
    this.formData = {
      paymoney: 0.0,
      feetype: ElectricCosts.E_FEE_ELETRIC,
      count: 0,
      furnitures: ''
    };
    this.formData.paymoney = this.formData.count;
  }

  ngOnInit() {
    if (!this.httpService.accountInfo.houseid) {
      this.navCtrl.pop();
      this.util.showAlertMsg('您尚未租房，无法继续操作');
      return;
    }
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getPaymentInfo(ElectricCosts.E_FEE_ELETRIC).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.feeInfo = data;
      }
    }, err => {
      this.navCtrl.pop();
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

  onClickSubmit() {
    let loader = this.loadingCtrl.create({content: "支付中..."});
    loader.present();
    this.httpService.doPayMoney(this.formData).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.payBillInfo = data;
        HNBridge.payBySMK(this.payBillInfo.payparms, this.payBillInfo.paysign, (msg)=>{
          console.log("************: returnCode=" + msg.returnCode + ", returnMsg=" + msg.returnMsg);
          if (msg.returnCode === 0) {
            this.givePayResult(this.payBillInfo, true);
          } else {
            this.givePayResult(this.payBillInfo, false);
          }
        });
      }
    }, err => {
      loader.dismiss();
    });
  }

  selectChanged() {
    this.formData.paymoney = this.formData.count;
    this.updateCost();
  }

  givePayResult(payBillInfo: PayBillInfo, result: boolean) {
    let loader = this.loadingCtrl.create({content: "支付结果上传中..."});
    loader.present();
    this.httpService.postPayResult(payBillInfo.billid, result).subscribe(() => {
      loader.dismiss();
    }, err => {
      loader.dismiss();
    });
  }

  updateCost() {
    this.httpService.getPayMoneyResult(this.formData).subscribe(data => {
      if (data) {
        this.formData.paymoney = data;
      }
    }, err => {
      this.util.showAlertMsg(err);
    });
  }
}
