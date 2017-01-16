/**
 * Created by russell on 2016/12/16.
 */
import {Component, OnInit} from "@angular/core";
import {ViewController, NavController, NavParams} from "ionic-angular";
import {RoomCosts} from "../../payment/roomCosts/roomCosts";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {ContractInfoBean} from "../../../beans/beans";
@Component({
  selector: 'rentProtocolModal',
  templateUrl: 'rentProtocolModal.html'
})
export class RentProtocolModal implements OnInit {

  public signPage: any;
  public agreement: boolean;
  public contract: ContractInfoBean;
  public gardenid: number;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public params: NavParams,
              public httpService: HirerHttpService) {
    this.signPage = params.get("signPage");
    this.contract = new ContractInfoBean();
  }

  ngOnInit() {
    this.httpService.contractContent().subscribe(data => {
      if (data) {
        this.contract = data;
      }
    }, err => {

    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onClickSubmit() {
    if (this.agreement) {
      this.dismiss();
      this.httpService.accountInfo.contractid = this.contract.id;
      this.httpService.contractAgree().subscribe(() => {
        this.signPage.navCtrl.push(RoomCosts, {gardenDetail: this.signPage.gardenDetail});
      }, err => {

      });

    }
  }
}
