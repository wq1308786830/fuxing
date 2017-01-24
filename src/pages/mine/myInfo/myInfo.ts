/**
 * Created by russell on 2016/12/19.
 */
import {Component} from "@angular/core";
import {NavController, LoadingController, NavParams} from "ionic-angular";
import {Camera, Transfer} from "ionic-native";
import {HirerHttpService} from "../../../services/hirer-http-service";
import {Utils} from "../../../services/utils";
import {MakerInfo} from "../../../beans/beans";
import {Unrent} from "../unrent/unrent";
@Component({
  selector: 'myInfo',
  templateUrl: 'myInfo.html'
})
export class MyInfo {

  public imageUri0: string;
  public accountInfo: MakerInfo;
  private imagePath0: string = "";

  private static DEFAULT_IMAGE_URI = "assets/img/camera.png";

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              public util: Utils,
              public httpService: HirerHttpService) {
    this.imageUri0 = httpService.accountInfo.idCardImg2 || MyInfo.DEFAULT_IMAGE_URI;
    this.accountInfo = httpService.accountInfo;
  }

  onClickSubmit() {
    this.navCtrl.push(Unrent);
  }

  onPickImg(index) {
    let options = {destinationType: 1, sourceType: 0, targetWidth: 300, targetHeight: 300, allowEdit: true};
    Camera.getPicture(options).then((imageFileUri) => {
      this.uploadImage(imageFileUri, index);
    }, error => {
    });
  }

  uploadImage(imageFileUri: string, index: number) {
    let fileName = "image" + index + ".jpg";

    const fileTransfer = new Transfer();
    let options = {
      fileKey: 'picture',
      fileName: fileName,
      chunkedMode: false,
      headers: {}
    };

    let loader5 = this.loadingCtrl.create({content: "正在上传头像..."});
    loader5.present();
    fileTransfer.upload(encodeURI(imageFileUri),
      "http://joyriver.xicp.net:9998/file/filesave.do?token=" + this.httpService.token,
      options).then(res => {
      loader5.dismiss();
      let imageinfo = JSON.parse(res.response);
      if (imageinfo.status === 0) {
        if (index === 0) {
          this.imageUri0 = imageinfo.data;
          this.imagePath0 = imageinfo.data;
          this.httpService.accountInfo.idCardImg2 = this.imagePath0;
          this.saveAndLookAvatar(this.imagePath0);
        }
      } else {
        loader5.dismiss();
        this.util.showAlertMsg(imageinfo.msg);
      }
    }, err => {
      loader5.dismiss();
      this.util.showAlertMsg("上传失败请重试");
      console.log(err);
    });
  }

  saveAndLookAvatar(img: string) {
    this.httpService.saveAvatar(img).subscribe(() => {
    }, err => {
    });
  }

}
