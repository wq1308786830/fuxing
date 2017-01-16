/**
 * Created by russell on 2016/12/19.
 */
import {Component} from "@angular/core";
import {NavController, LoadingController, NavParams} from "ionic-angular";
import {Camera} from "ionic-native";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {Utils} from "../../../services/utils";
import {MakerInfo} from "../../../beans/beans";
@Component({
  selector: 'myInfo',
  templateUrl: 'myInfo.html'
})
export class MyInfo {

  public imageUri0: string;
  public accountInfo: MakerInfo;
  private imagePath0: string = "";

  private static DEFAULT_IMAGE_URI = "assets/img/photo.png";

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.imageUri0 = MyInfo.DEFAULT_IMAGE_URI;
    this.accountInfo = httpService.accountInfo;
  }

  onClickSubmit() {

  }

  onPickImg(index) {
    let options = {destinationType: 1, sourceType: 0, targetWidth: 300, targetHeight: 300, allowEdit: true};
    Camera.getPicture(options).then((imageFileUri) => {
      // this.uploadImage(imageFileUri, index);
    }, error => {

    });
  }

}
