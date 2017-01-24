/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, LoadingController} from "ionic-angular";
import {GarDenStyleBean, HouseSimpleBean, HouseToRentInfo, PayBillInfo} from "../../../beans/beans";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {PaymentListModal} from "../../payment/modals/listModal";
import {Utils} from "../../../services/utils";

declare var HNBridge;
@Component({
  selector: 'rentCost',
  templateUrl: 'roomCosts.html'
})
export class RentCosts implements OnInit {

  public gardenDetail: GarDenStyleBean;
  public houseList: HouseSimpleBean[];
  public houseDetail: HouseToRentInfo;
  public payBillInfo: PayBillInfo;

  public moneyPerMonth: number;
  public newMoneyPerMonth: number;
  public allMoney: number;
  public depositMoney: number;
  public changeDate: string;
  public idList: string;
  public monthCount: number;
  public billid: string;


  constructor(public navCtrl: NavController,
              public params: NavParams,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.gardenDetail = params.get("gardenDetail");
    this.houseList = [];
    this.houseDetail = new HouseToRentInfo;
    this.payBillInfo = new PayBillInfo;

    this.moneyPerMonth = 0;
    this.newMoneyPerMonth = 0;
    this.allMoney = 0;
    this.depositMoney = 0;
    this.changeDate = '';
    this.idList = '';
    this.monthCount = 12;
    this.billid = '';
  }

  ngOnInit() {

    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.waitRentHouseList(this.gardenDetail).subscribe(data => {
      loader.dismiss();
      if (data.length) {
        this.houseList = data;
        this.getHouseDetail(this.houseList[0].id);
        this.updateCost();
      }
    }, err => {
      loader.dismiss();
    });
  }

  getHouseDetail(id: string) {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.getRentHouseInfo(id).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.houseDetail = data;
      }
    }, err => {
      loader.dismiss();
    });
  }

  goHouseList() {
    this.navCtrl.push(PaymentListModal, {signPage: this});
  }

  onSelectMonth() {
    this.updateCost();
  }

  onClickSubmit() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.doRentHouse(this.houseDetail.id, this.idList, this.monthCount, this.allMoney).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.payBillInfo = data;
        HNBridge.payBySMK(this.payBillInfo.payparms, this.payBillInfo.paysign, (msg)=>{
          console.log("************: returnCode=" + msg.returnCode + ", returnMsg=" + msg.returnMsg);
          if (msg.returnCode === '00') {
            this.updatePaymentState(true);
          } else {
            this.updatePaymentState(false);
          }
        });
      }
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

  chooseChange(id: number, choosed: boolean) {
    this.checkedItem(id, choosed);
    this.updateCost();
  }

  updateCost() {
    //判断有没有交过押金
    // let loader = this.loadingCtrl.create({content: "加载中..."});
    // loader.present();
    this.httpService.getRentMoney(this.houseDetail.id, this.idList, this.monthCount).subscribe(data => {
      // loader.dismiss();
      if (data) {
        this.allMoney = data;
      }
    }, err => {
      // loader.dismiss();
    });
  }

  //支付完成后，付费结果上传
  updatePaymentState(state: boolean) {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.updateRentState(this.payBillInfo.billid, state).subscribe(() => {
      loader.dismiss();
    }, err => {
      loader.dismiss();
    });
  }

  /**
   * 操作idList（需要提交的id组合成一个字符串用逗号间隔）
   * @param id
   * @param choosed
   */
  checkedItem(id: number, choosed: boolean) {
    if (this.idList.indexOf(id + ',') >= 0 && !choosed) {
      this.idList = this.idList.replace(new RegExp(id + ','), '');
    } else if (this.idList.indexOf(id + ',') < 0 && choosed) {
      this.idList += id + ',';
    }
  }
}
