/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
@Component({
  selector: 'electricCosts',
  templateUrl: 'electricCosts.html'
})
export class ElectricCosts implements OnInit{

  public moneyPerDegree: number = 0;
  public lastMoney: number = 100;
  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.moneyPerDegree = 1.5;
  }

  onSelectMoney() {
  }

  onClickSubmit() {

  }
}
