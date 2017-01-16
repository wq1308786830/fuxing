/**
 * Created by russell on 2016/12/9.
 */
import {Injectable} from '@angular/core';
import {AlertController, ToastController} from 'ionic-angular';

@Injectable()
export class Utils {

  constructor(public alertCtrl: AlertController,
              public toastCtrl: ToastController) {
  }

  getDayTimeStr(time: Date) {
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDay();

    let years = "0" + year.toString();
    years = years.substring(years.length - 4);

    let months = "0" + month.toString();
    months = months.substring(months.length - 2);

    let days = "0" + day.toString();
    days = days.substring(days.length - 2);

    return years + months + days + '000000';
  }

  getCurTimeStr() {
    return new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/[T\-\:]/g, '').replace(/\.[\d]{3}Z/, '');
  }

  showAlertMsg(msg: string) {
    let alert = this.alertCtrl.create({
      title: '提示',
      subTitle: msg,
      buttons: ['确定']
    });
    alert.present();
  }

  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
