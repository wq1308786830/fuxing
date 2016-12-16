import {ViewController, NavParams, Platform} from "ionic-angular";
import {Component} from "@angular/core";
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

  public data: any;

  constructor(public platform: Platform,
              public params: NavParams,
              public viewCtrl: ViewController) {
    this.data = this.params.get('data');
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
    this.dismiss();
  }
}
