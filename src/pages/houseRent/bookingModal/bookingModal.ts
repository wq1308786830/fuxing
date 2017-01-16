/**
 * Created by russell on 2016/12/16.
 */
import {Component} from "@angular/core";
import {ViewController, NavController, NavParams, LoadingController} from "ionic-angular";
import {RoomCosts} from "../../payment/roomCosts/roomCosts";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {GarDenStyleBean} from "../../../beans/beans";
import {Utils} from "../../../services/utils";
@Component({
  selector: 'bookingModal',
  templateUrl: 'bookingModal.html'
})
export class BookingModal {

  public booking: any;
  public roomLocation: string;
  public gardenDetail: GarDenStyleBean;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.gardenDetail = params.get("gardenDetail");
    this.roomLocation = this.gardenDetail.gname;
    this.booking = {
      changeDate: '2016-01-01T00:00+01:00',
      phoneNo: this.httpService.accountInfo.mobiPhone
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onClickSubmit() {
    let dateArr = this.booking.changeDate.split('T');
    this.booking.changeDate = dateArr[0] + ' ' + dateArr[1].split('+')[0];
    this.httpService.houseAppointMent(this.gardenDetail.id, this.booking).subscribe( () => {
      this.dismiss();
      this.util.showAlertMsg("恭喜您，预约成功");
    }, err => {
      this.util.showAlertMsg("抱歉，预约失败");
    });

  }
}
