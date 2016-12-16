/**
 * Created by russell on 2016/12/12.
 */
import {Component, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
@Component({
  selector: 'roomCosts',
  templateUrl: 'roomCosts.html'
})
export class RoomCosts implements OnInit{

  public depositMoney: number = 0;  //押金
  public monthCount: number = 1;
  public moneyPerMonth: number = 0;
  public allMoney: number = 0;
  public choose: any;
  public chooseCost: number = 0;
  public moneyChanged: boolean = false;
  public changeDate: string = '';
  public newMoneyPerMonth: number = 0;
  constructor(public navCtrl: NavController) {
    this.choose = {
      fee1: false,
      fee2: false,
      fee3: false
    };

  }

  ngOnInit() {
    this.moneyPerMonth = 1500;
    this.depositMoney = 1500;
    this.moneyChanged = true;
    this.changeDate = '2016年12月22日';
    this.newMoneyPerMonth = 1800;
    this.allMoney = this.moneyPerMonth * this.monthCount + this.chooseCost + this.depositMoney;
  }

  onSelectMonth() {
    this.updateCost();
  }

  onClickSubmit() {
    console.log(this.choose.fee1);
  }

  chooseChange() {
    console.log(this.choose.fee1);
    this.chooseCost = (this.choose.fee1 ? 50:0) + (this.choose.fee2 ? 50:0) + (this.choose.fee3 ? 30:0);
    this.updateCost();
  }

  updateCost() {
    //判断有没有交过押金
    this.allMoney = this.moneyPerMonth * this.monthCount + this.chooseCost + this.depositMoney;
  }
}
