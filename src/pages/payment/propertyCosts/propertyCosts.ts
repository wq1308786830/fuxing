/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
@Component({
  selector: 'propertyCosts',
  templateUrl: 'propertyCosts.html'
})
export class PropertyCosts implements OnInit{

  public monthCount: number = 1;
  public moneyPerMonth: number = 0;
  public allMoney: number = 0;
  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.moneyPerMonth = 1600;
  }

  onSelectMonth() {
    this.allMoney = this.moneyPerMonth * this.monthCount;
  }

  onClickSubmit() {

  }
}
