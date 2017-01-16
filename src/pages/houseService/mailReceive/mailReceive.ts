/**
 * Created by russell on 2016/12/15.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, LoadingController, ModalController} from "ionic-angular";
import {MailReceiveApply} from "../mailReceiveApply/mailReceiveApply";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {Utils} from "../../../services/utils";
import {MailInfo} from "../../../beans/beans";
@Component({
  selector: 'mailReceive',
  templateUrl: 'mailReceive.html'
})
export class MailReceive implements OnInit {

  public receiveTag: string;

  public notReceivedList: MailInfo[];
  public receivedList: MailInfo[];
  private currPage1: number;
  private currPage2: number;


  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.receiveTag = 'notReceived';
    this.notReceivedList = [];
    this.receivedList = [];
    this.currPage1 = 0;
    this.currPage2 = 0;
  }

  ngOnInit(): void {

    let loader = this.loadingCtrl.create({content: "正在加载..."});
    loader.present();
    this.httpService.getMailApplyList(0, false).subscribe(data => {
      loader.dismiss();
      if (data) {
        this.notReceivedList = data;
      }
    }, err => {
      loader.dismiss();
    });

  }

  segmentChanged() {
    let loader;
    switch (this.receiveTag) {
      case 'notReceived':
        loader = this.loadingCtrl.create({content: "正在加载..."});
        loader.present();
        this.httpService.getMailApplyList(0, false).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.notReceivedList = data;
          }
        }, err => {
          loader.dismiss();
        });
        break;

      case 'received':
        loader = this.loadingCtrl.create({content: "正在加载..."});
        loader.present();
        this.httpService.getMailApplyList(0, true).subscribe(data => {
          loader.dismiss();
          if (data) {
            this.receivedList = data;
          }
        }, err => {
          loader.dismiss();
        });
        break;

      default:
        break;
    }
  }

  addMailReceive() {
    this.navCtrl.push(MailReceiveApply);
  }

  doInfinite(ev) {
    if (this.receiveTag === 'notReceived') {
      this.httpService.getMailApplyList(++this.currPage1, false).subscribe(data => {
        ev.complete();
        if (data) {
          for (let item of data) {
            this.notReceivedList.push(item);
          }
        }
      }, err => {
        ev.complete();
      });
    }

    if (this.receiveTag === 'received') {
      this.httpService.getMailApplyList(++this.currPage1, true).subscribe(data => {
        ev.complete();
        if (data) {
          for (let item of data) {
            this.receivedList.push(item);
          }
        }
      }, err => {
        ev.complete();
      });
    }
  }
}
