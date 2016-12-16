/**
 * Created by russell on 2016/12/9.
 */
import {Component} from "@angular/core";
import {MainIndex} from "../mainIndex/mainIndex";
@Component({
  selector: 'main-tabs',
  templateUrl: 'mainTabs.html'
})
export class MainTabs {
  public tabIndex: any;
  public tabNotice: any;
  public tabMine: any;

  constructor() {
    this.tabIndex = MainIndex;
  }
}
