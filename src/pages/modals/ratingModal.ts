import {ViewController, NavParams, Platform, LoadingController} from "ionic-angular";
import {Component} from "@angular/core";
import {HirerHttpService} from "../../services/hirer-http-service";
import {RepairInfo} from "../../beans/beans";
import {Utils} from "../../services/utils";
/**
 * Created by russell on 2016/12/15.
 */

//评价modal
@Component({
  selector: 'modal',
  templateUrl: 'ratingModal.html'
})
export class RatingModal {

  public stars: Array<any> = [];
  public rateScore: number = 0;
  public ratingContent: string = '';

  public data: RepairInfo;
  public type: string;

  constructor(public platform: Platform,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              public viewCtrl: ViewController,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.data = params.get('data');
    this.type = params.get('type');
    this.stars = [
      {name: 'star-outline'},
      {name: 'star-outline'},
      {name: 'star-outline'},
      {name: 'star-outline'},
      {name: 'star-outline'}
    ];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  scoreRate(i: number) {
    this.rateScore = i + 1;
    this.stars = [
      {name: 'star-outline'},
      {name: 'star-outline'},
      {name: 'star-outline'},
      {name: 'star-outline'},
      {name: 'star-outline'}
    ];
    for (let j = 0; j < i + 1; j++) {
      this.stars[j] = {name: 'star'};
    }
  }

  onClickSubmit() {
    let uri = '';
    if (this.type === 'repair') {
      uri = '/repair/score.do';
    }
    if (this.type === 'clean') {
      uri = '/clean/score.do';
    }

    let loader = this.loadingCtrl.create({content: "正在提交..."});
    loader.present();
    this.httpService.scoreItem(uri, this.data.id, this.rateScore, this.ratingContent).subscribe(() => {
      loader.dismiss();
      this.dismiss();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg("提交失败，请重试");
    });
  }
}
