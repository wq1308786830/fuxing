/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {Camera, Transfer} from "ionic-native";
import {ModalController, LoadingController, NavParams, Platform} from "ionic-angular";
import {RatingModal} from "../modals/ratingModal";
import {ItemModal} from "../modals/itemModal";
import {HirerHttpService} from "../../services/hirer-http-service";
import {Utils} from "../../services/utils";
import {RepairInfo} from "../../beans/beans";
@Component({
  selector: 'faultRepair',
  templateUrl: 'faultRepair.html'
})
export class FaultRepair implements OnInit {

  faultRepair = 'faultRepairForm';
  public isList: boolean;
  public formDetail: any;
  public imageUri0: string;
  public now: Date;
  private currPage: number;

  private imagePath0: string;

  public repairList: RepairInfo[];

  private static DEFAULT_IMAGE_URI = "assets/img/add_img.png";

  constructor(public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public params: NavParams,
              public platform: Platform,
              public util: Utils,
              public httpService: HirerHttpService) {
    params.get('isList') ? this.faultRepair = 'faultRepairList' : this.faultRepair = 'faultRepairForm';
    this.currPage = 1;
    this.repairList = [];
    this.now = new Date();

    this.imageUri0 = FaultRepair.DEFAULT_IMAGE_URI;
    //todo:地址的数据
    this.formDetail = {
      repairContent: '',
      masterName: this.httpService.accountInfo.name || '',
      masterSex: this.httpService.accountInfo.gender || true,
      masterPhoneNo: this.httpService.accountInfo.mobiPhone || '',
      masterAddress: '',
      changeDate: '2016-01-01T00:00:00+01:00',
      masterAtHome: true
    }
  }

  ngOnInit() {
    this.segmentChanged();
  }

  changePhoneNo() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系电话', formDetail: this.formDetail});
    modal.present();
  }

  changeName() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系人', formDetail: this.formDetail});
    modal.present();
  }

  onPickImg(index) {
    let options = {destinationType: 1, sourceType: 0, targetWidth: 300, targetHeight: 300, allowEdit: true};
    Camera.getPicture(options).then((imageFileUri) => {
      this.uploadImage(imageFileUri, index);
    }, error => {

    });
  }

  goPayMoney(data: RepairInfo) {
    let loader = this.loadingCtrl.create({content: "正在提交..."});
    loader.present();
    this.httpService.payRepair(data.id).subscribe(() => {
      loader.dismiss();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg("提交失败，请重试");
    });
  }

  goRating(data: RepairInfo) {
    let modal = this.modalCtrl.create(RatingModal, {data: data, type: 'repair'});
    modal.present();
  }

  onClickSubmit() {
    let dateArr = this.formDetail.changeDate.split('T');
    this.formDetail.changeDate = dateArr[0] + ' ' + dateArr[1].split('+')[0].substring(0, 5);

    let loader = this.loadingCtrl.create({content: "正在提交..."});
    loader.present();
    this.httpService.repairApply(this.formDetail, this.imageUri0, '').subscribe(() => {
      loader.dismiss();
    }, err => {
      loader.dismiss();
      this.util.showAlertMsg("提交失败，请重试");
    });
  }

  segmentChanged() {

    if (this.httpService.accountInfo.houseid) {

      switch (this.faultRepair) {

        case 'faultRepairForm':
          this.httpService.getRentHouseInfo(this.httpService.accountInfo.houseid + '').subscribe(data => {
            this.formDetail.masterAddress = data.name;
          }, err => {
            this.util.showAlertMsg("获取房间地址失败");
          });
          break;

        case 'faultRepairList':
          let loader = this.loadingCtrl.create({content: "正在加载..."});
          loader.present();
          this.httpService.getRepairApplyList(1).subscribe(data => {
            loader.dismiss();
            if (data) {
              this.repairList = data;
            }
          }, err => {
            loader.dismiss();
            this.util.showAlertMsg("获取数据失败，请重试");
          });
          break;

        default:
          break;
      }
    }
  }

  doInfinite(ev) {
    if (this.faultRepair === 'faultRepairList') {
      this.httpService.getRepairApplyList(++this.currPage).subscribe(data => {
        if (data) {
          for (let item of data) {
            this.repairList.push(item);
          }
        }
        ev.complete();
      }, err => {
        ev.complete();
      });
    } else {
      ev.complete();
    }
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

    let loader5 = this.loadingCtrl.create({content: "正在上传图片..."});
    loader5.present();
    fileTransfer.upload(encodeURI(imageFileUri),
      "http://joyriver.xicp.net:9998/file/filesave.do?token="+this.httpService.token,
      options).then(res => {
      loader5.dismiss();
      let imageinfo = JSON.parse(res.response);
      if (imageinfo.status === 0) {
        if (index === 0) {
          this.imageUri0 = imageinfo.data;
          this.imagePath0 = imageinfo.data;
        }
      } else {
        loader5.dismiss();
        this.util.showAlertMsg(imageinfo.msg);
      }
    }, err => {
      loader5.dismiss();
      this.util.showAlertMsg(err);
      console.log(err);
    });
  }

}




