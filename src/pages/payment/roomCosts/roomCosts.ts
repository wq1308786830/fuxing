/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, ViewController, NavParams, Platform, LoadingController} from "ionic-angular";
import {
  GarDenStyleBean, HousePayFormBean, HouseSimpleBean,
  HouseToRentInfo, MakerInfo, MoneyFeeInfo, PayBillInfo
} from "../../../beans/beans";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {PaymentListModal} from "../modals/listModal";
import {Utils} from "../../../services/utils";

declare var HNBridge;
@Component({
  selector: 'roomCosts',
  templateUrl: 'roomCosts.html'
})
export class RoomCosts implements OnInit {

  private static E_FEE_HOUSE: number = 5;

  public feeInfo: MoneyFeeInfo;
  public userInfo: MakerInfo;
  public formData: any;
  public payBillInfo: PayBillInfo;
  public idList: string;

  public moneyPerMonth: number;
  public newMoneyPerMonth: number;
  public allMoney: number;
  public changeDate: string;
  public monthCount: number;
  public billid: string;


  constructor(public navCtrl: NavController,
              public params: NavParams,
              public util: Utils,
              public loadingCtrl: LoadingController,
              public httpService: HirerHttpService) {
    this.feeInfo = new MoneyFeeInfo;
    this.userInfo = this.httpService.accountInfo;
    this.payBillInfo = new PayBillInfo;
    this.idList = '';
    this.formData = {
      paymoney: 0.0,
      feetype: RoomCosts.E_FEE_HOUSE,
      count: 0,
      furnitures: ''
    };
    this.moneyPerMonth = 0;
    this.newMoneyPerMonth = 0;
    this.allMoney = 0;
    this.changeDate = '';
    this.monthCount = 0;
    this.billid = '';
    this.formData.count = this.monthCount;
  }

  ngOnInit() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getPaymentInfo(RoomCosts.E_FEE_HOUSE).subscribe(data => {
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
    this.formData.count = this.monthCount;
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

  chooseChange(id: number) {
    this.checkedItem(id);
    this.formData.furnitures = this.idList;
    this.updateCost();
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

  /**
   * 操作idList（需要提交的id组合成一个字符串用逗号间隔）
   * @param id
   */
  checkedItem(id: number) {

    if (this.idList.indexOf(id + ',') >= 0) {
      this.idList = this.idList.replace(new RegExp(id + ','), '');
    } else {
      this.idList += id + ',';

    }
  }
}
