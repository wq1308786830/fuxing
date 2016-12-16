import {ViewController, NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";
/**
 * Created by russell on 2016/12/15.
 */
//电话和姓名性别的modal
@Component({
  selector: 'modal',
  templateUrl: 'itemModal.html'
})
export class ItemModal {

  public title: string = '';
  public formDetail: any;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
    this.title = this.params.get('title');
    this.formDetail = this.params.get('formDetail');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onClickSubmit() {
    this.dismiss();
  }
}
