/**
 * Created by russell on 2016/12/9.
 */
import {Component, ViewChild} from "@angular/core";
import {MainIndex} from "../mainIndex/mainIndex";
import {AnnounceList} from "../announcement/announceList/announceList";
import {MineNav} from "../mine/mineNav/mineNav";
import {Tabs, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HirerHttpService} from "../../services/hirer-http-service";
@Component({
  selector: 'main-tabs',
  templateUrl: 'mainTabs.html'
})
export class MainTabs {
  @ViewChild('myTabs') tabRef: Tabs;

  public tabIndex: any;
  public tabNotice: any;
  public tabMine: any;

  constructor(public navCtrl: NavController,
              public httpService: HirerHttpService) {
    this.tabIndex = MainIndex;
    this.tabNotice = AnnounceList;
    this.tabMine = MineNav;
  }
}
