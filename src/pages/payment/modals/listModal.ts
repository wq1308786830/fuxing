/**
 * Created by russell on 2017/1/9.
 */
import {Component, OnInit} from "@angular/core";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {LoadingController, NavParams, NavController} from "ionic-angular";
import {HouseSimpleBean} from "../../../beans/beans";
@Component({
  selector: 'listModal',
  templateUrl: 'listModal.html'
})
export class PaymentListModal implements OnInit{

  public self: any;
  public list: HouseSimpleBean;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              public loadingCtrl: LoadingController,
              public httpService: HirerHttpService) {
    this.self = params.get('signPage');
  }

  ngOnInit(): void {
  }


  navOrSelect(item: HouseSimpleBean) {
    if (this.self.getouseDetail(item.id)) {
      this.navCtrl.pop();
    }
  }
}
