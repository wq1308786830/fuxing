/**
 * Created by russell on 2016/12/16.
 */
import {Component, OnInit} from "@angular/core";
import {NavController, ModalController, LoadingController, NavParams} from "ionic-angular";
import {RentProtocolModal} from "../rentProtocolModal/rentProtocolModal";
import {BookingModal} from "../bookingModal/bookingModal";
import {GarDenStyleBean} from "../../../beans/beans";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {Utils} from "../../../services/utils";
import {RentCosts} from "../roomCosts/roomCosts";
@Component({
  selector: 'houseDetail',
  templateUrl: 'houseDetail.html'
})

export class HouseDetail implements OnInit {

  mySlideOptions = {
    pager: true,
    autoplay: 2000,
    initialSlide: 1,
    loop: true,

  };

  public agreement: boolean;
  public gardenDetail: GarDenStyleBean;
  public gardenid: number;

  constructor(public navCtrl: NavController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.gardenDetail = new GarDenStyleBean();
    this.agreement = false;
    this.gardenid = params.get("gardenid");
  }

  ngOnInit() {

    let loader = this.loadingCtrl.create({content: "加载中..."});
    loader.present();
    this.httpService.gardenListStyle(this.gardenid).subscribe( data => {
      loader.dismiss();
      if (data) {
        this.gardenDetail = data[0];
      }
    }, err => {
      loader.dismiss();
    });
  }

  modalProtocal() {
    let modal = this.modalCtrl.create(RentProtocolModal, {signPage: this, gardenDetail: this.gardenDetail});
    modal.present();
  }

  goRentPage() {
    this.navCtrl.push(RentCosts, {gardenDetail: this.gardenDetail});
  }

  modalBooking() {
    let modal = this.modalCtrl.create(BookingModal, {gardenDetail: this.gardenDetail});
    modal.present();
  }
}
