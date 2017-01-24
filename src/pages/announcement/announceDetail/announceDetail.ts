/**
 * Created by russell on 2016/12/12.
 */
import {Component} from "@angular/core";
import {NavController, LoadingController, NavParams} from "ionic-angular";
import {NoticeInfo} from "../../../beans/beans";
import {Utils} from "../../../services/utils";
@Component({
  selector: 'announceDetail',
  templateUrl: 'announceDetail.html'
})
export class AnnounceDetail {

  public notice: NoticeInfo;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public params: NavParams) {
    this.notice = params.get('data')
  }


}
