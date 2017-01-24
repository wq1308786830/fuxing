/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController} from "ionic-angular";
import {AnnounceDetail} from "../announceDetail/announceDetail";
import {NoticeInfo} from "../../../beans/beans";
import {Utils} from "../../../services/utils";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {LoginPage} from "../../login/login";
import {MainIndex} from "../../mainIndex/mainIndex";
@Component({
  selector: 'announceList',
  templateUrl: 'announceList.html'
})
export class AnnounceList implements OnInit {

  public notices: NoticeInfo[];
  public currPage: number;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.notices = [];
    this.currPage = 1;
  }

  ngOnInit(): void {
      this.loadData();
  }

  loadData() {
    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.listNotice(1).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.notices = data;
      }

    }, err => {
      loader.dismiss();
      this.util.showAlertMsg(err);
    });
  }

  doInfinite(ev) {
    this.httpService.listNotice(++this.currPage).subscribe(data => {
      if (data) {
        for (let item of data) {
          this.notices.push(item);
        }
      }
      ev.complete();
    }, err => {
      ev.complete();
    });
  }

  onClickDetail(data: NoticeInfo) {
    this.navCtrl.push(AnnounceDetail, {data: data});
  }
}
