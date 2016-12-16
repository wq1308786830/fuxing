/**
 * Created by russell on 2016/12/15.
 */
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {MailReceiveApply} from "../mailReceiveApply/mailReceiveApply";
@Component({
  selector: 'mailReceive',
  templateUrl: 'mailReceive.html'
})
export class MailReceive {

  receiveTag = 'notReceived';
  constructor(public navCtrl: NavController) {

  }

  addMailReceive() {
    this.navCtrl.push(MailReceiveApply);
  }
}
