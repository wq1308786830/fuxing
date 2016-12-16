/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
@Component({
  selector: 'waterCosts',
  templateUrl: 'waterCosts.html'
})
export class WaterCosts implements OnInit{

  public moneyPerTon: number = 0;
  public lastMoney: number = 100;
  constructor(public navCtrl: NavController) {

  }

  ngOnInit() {
    this.moneyPerTon = 4;
  }

  onSelectMoney() {
  }

  onClickSubmit() {

  }
}
