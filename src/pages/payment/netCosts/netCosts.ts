/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {MoneyFeeInfo, MakerInfo, PayBillInfo} from "../../../beans/beans";
import {Utils} from "../../../services/utils";
import {HirerHttpService} from "../../../services/hirer-http-service";

declare var HNBridge;
@Component({
  selector: 'netCosts',
  templateUrl: 'netCosts.html'
})
export class NetCosts implements OnInit{

  private static E_FEE_NET: number = 4;

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
      feetype: NetCosts.E_FEE_NET,
      count: 0,
      furnitures: ''
    }
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getPaymentInfo(NetCosts.E_FEE_NET).subscribe(data => {
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

  onSelectMonth() {
    this.updateCost();
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
      this.util.showAlertMsg('计价失败，请重试');
    });
  }
}
