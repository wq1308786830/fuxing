/**
 * Created by russell on 2016/12/9.
 */

import {List} from "ionic-angular";
export class MakerInfo {
  id: number;
  name: string;
  nick: string;
  gender: boolean;
  idCardType: number;
  idCardNo: string;
  birthday: string;
  age: number;
  telPhone: string;
  mobiPhone: string;
  account: string;
  houseid: number;
  housename: string;
  contractid: number;
  idCardImg2: string;
}

/**
 * Forms
 */
export class HousePayFormBean {
  name: string;
  depositMoney: number;  //押金
  monthCount: number;
  moneyPerMonth: number;
  allMoney: number;
  chooseItem: AdditionalPayBean[];
  moneyChanged: boolean;
  changeDate: string;
  newMoneyPerMonth: number;
}

export class AdditionalPayBean {
  aid: string;
  aname: string;
  acost: number;
  achoosed: boolean;
}


export class AccountBean {
  uaccount: string;                //账号             //用户名
  upasswd: string;               //密码
  name: string;                   //姓名
  type: string;                   //权限
  accountCode: string;            //
  id: string;                     //号
}

export class GarDenStyleBean {
  gid: number;           //园区ID
  gname: string;          //园区名称
  id: number;            //户型ID
  name: string;           //户型名称
  imgurl: string;            //户型图片地址
  description: string;    //户型说明
  area: number;           //户型面积
  rent: number;           //单价
  rent_unit: number;           //计价单位
  decoration: string;       //装修
  towards: string;        //朝向
}


export class HouseSimpleBean {
  id: string;
  name: string;
}

export class HouseToRentInfo {
  id: string;            //房号ID
  name: string;           //房号名称
  rentPrice: number;      //租金
  rentUnitName: string;   //计价单位
  deposit: number;   //押金
  standarFurnitrues: TblFurnitureExBean[];  //标配家具
  optionalFurnitrues: TblFurnitureExBean[]; //选配家具
}

export class TblFurnitureExBean {
  id: string;          //家具ID
  name: string;      //家具名称
  rentPrice: number;  //租金
  rentPriceUnit: number;
  rentUnitName: string;  //计价单位
  damagePrice: number;     //损毁的赔偿金
  price: number;           //家具原价
  deposit: number;         //家具需要的押金
  needRent: boolean;
  choosed: boolean;
}

export class ContractInfoBean {
  id: number;
  title: string;
  contenet: string;
}

export class NoticeInfo {
  id: number;
  imgUrl: string;
  title: string;
  content: string;
  createTime: string;    //yyyy-MM-dd HH:mm
}

export class RepairInfo {
  id: number;
  repairmsg: string;
  needrepairtime: string;
  repairtime: string;
  reparied: boolean;
  scored: boolean;
  moneyinfo: string;
  moneyed: boolean;
}

export class CleanInfo {
  id: number;
  cleanmsg: string;
  cleantime: string;
  needcleantime: string;
  img: string;                 //保洁我想说
  moneyinfo;               //保洁报价
  cleaned: string;            //是否清洁
  scored: string;       //是否评价
  moneyed: boolean;             //是否付费
}

export class MailInfo {
  id: number;
  mailcom: string;
  mailno: string;
  createtime: string;
  arrived: boolean;
  finished: boolean;
  arrivedtime: string;
  finishtime: string;
}

export class MoneyFeeInfo {
  houseid: string;
  housename: string;
  feetype: number;
  feetypename: string;
  unit_price: number;
  unit_name: string;
  end_time: string;  // 目前费用到期时间,物业费，宽带费，房租有效
  end_num: string;  // 目前费用的可用读表数,水费，电费有效
  standarFurnitrues: TblFurnitureExBean[];
  optionalFurnitrues: TblFurnitureExBean[];
}

export class MoneyPayInfo {
  billid: string;      //付费单号
  houseid: string;
  housename: string;
  feetype: number;
  feetypename: string;
  money: number;
  unit_count: number;
  unit_price: number;
  unit_name: string;
  paysucc: boolean;    //是否付费成功
  create_time: string;
  result_time: string;
  start_time: string;  //此次计费对有效期的影响,物业费，宽带费，房租有效
  end_time: string;
  start_num: string;
  end_num: string;      //此次计费的有效数值段的影响,水费，电费有效
  standarFurnitrues: TblFurnitureExBean[];
  optionalFurnitrues: TblFurnitureExBean[];
}

export class PayBillInfo {
  merchantid: string;
  orderinfo: string;
  orderid: string;
  money: number;
  billid: string;
  payparms: string;
  paysign: string;
}
