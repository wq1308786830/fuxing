/**
 * Created by russell on 2016/12/13.
 */
import {Component, OnInit} from "@angular/core";
import {Camera} from "ionic-native";
import {ModalController} from "ionic-angular";
import {RatingModal} from "../modals/ratingModal";
import {ItemModal} from "../modals/itemModal";
@Component({
  selector: 'faultRepair',
  templateUrl: 'faultRepair.html'
})
export class FaultRepair implements OnInit {

  faultRepair = 'faultRepairForm';
  public formDetail: any;
  public imageUri0: string;
  public imageUri1: string;
  public imageUri2: string;

  private imagePath0: string = "";
  private imagePath1: string = "";
  private imagePath2: string = "";
  public imgsPath: string = "";

  private static DEFAULT_IMAGE_URI = "assets/img/add_img.png";

  constructor(public modalCtrl: ModalController) {
    this.imageUri0 = FaultRepair.DEFAULT_IMAGE_URI;
    this.imageUri1 = FaultRepair.DEFAULT_IMAGE_URI;
    this.imageUri2 = FaultRepair.DEFAULT_IMAGE_URI;
    this.formDetail = {
      repairContent: '',
      masterName: '',
      masterPhoneNo: '',
      masterAddress: '',
      changeDate: '',
      masterAtHome: false
    }
  }

  ngOnInit() {
    this.formDetail = {
      repairContent: '',
      masterName: '李阳',
      masterPhoneNo: '1381818181',
      masterAddress: '于都大楼',
      changeDate: '21-11-2016',
      masterAtHome: false
    }
  }

  changePhoneNo() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系电话'});
    modal.present();
  }

  changeName() {
    let modal = this.modalCtrl.create(ItemModal, {title: '修改联系人'});
    modal.present();
  }

  onPickImg(index) {
    let options = {destinationType: 1, sourceType: 0, targetWidth: 300, targetHeight: 300, allowEdit: true};
    Camera.getPicture(options).then((imageFileUri) => {
      // this.uploadImage(imageFileUri, index);
    }, error => {

    });
  }

  goPayMoney() {

  }

  goRating() {
    let modal = this.modalCtrl.create(RatingModal);
    modal.present();
  }

  onClickSubmit() {

  }

}




