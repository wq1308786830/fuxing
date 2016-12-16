/**
 * Created by russell on 2016/12/12.
 */
import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AnnounceDetail} from "../announceDetail/announceDetail";
@Component({
  selector: 'announceList',
  templateUrl: 'announceList.html'
})
export class AnnounceList {

  constructor(public navCtrl: NavController) {

  }

  onClickDetail() {
    this.navCtrl.push(AnnounceDetail);
  }
}
