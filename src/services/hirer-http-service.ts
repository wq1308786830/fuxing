/**
 * Created by russell on 2016/12/9.
 */
import {Injectable} from "@angular/core";
import {App, Platform} from "ionic-angular";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {
  AccountBean, GarDenStyleBean, ContractInfoBean, NoticeInfo, RepairInfo,
  CleanInfo, MailInfo, MakerInfo, HouseSimpleBean, HouseToRentInfo, MoneyFeeInfo, MoneyPayInfo, PayBillInfo
} from "../beans/beans";
import {Observable} from "rxjs/Rx";
import {LoginPage} from "../pages/login/login";


@Injectable()
export class HirerHttpService {
  static API_HOST: string = "http://joyriver.xicp.net:9998";
  static CONTENT_TYPE_APPLICATION: string = "application/x-www-form-urlencoded;charset=utf-8";

  public token: string;
  public accountInfo: MakerInfo;

  public isLogin: boolean = false;

  constructor(public http: Http, public app: App, public platform: Platform) {
    this.accountInfo = new MakerInfo();
    this.token = '';
  }

  public extractData(res: Response) {
    let body = res.json();
    if (body.status === 1) {
      return body.data;
    }

    if (body.status === 10000) {
      throw new Error("请登录");
    } else if (body.status === 0) {
      throw new Error("失败");
    } else if (body.status === 10001) {
      throw new Error("用户未被授权");
    } else if (body.status === 10002) {
      throw new Error("请求参数错误");
    } else {
      throw new Error(body.msg || "error");
    }
  }

  public handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : '服务器错误';

    if (errMsg === "请登录") {
      // this.app.getActiveNav().push(LoginPage);
      return null;
    } else {
      return Observable.throw(errMsg);
    }
  }

  public basePost(postUrl: string, body?: any): Observable<any> {

    let headers = new Headers({'Content-Type': HirerHttpService.CONTENT_TYPE_APPLICATION});
    let options = new RequestOptions({headers: headers});

    if (!body) {
      body = null;
    }

    return this.http.post(HirerHttpService.API_HOST + postUrl + '?token=' + this.token, body, options)
      .map(res => {
        return this.extractData(res);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  /**
   * 登录
   * @param user
   * @returns {Observable<any>}
   */
  public login(user: any): Observable<string> {
    let body = 'uaccount='+user.phoneNo+'&upasswd='+user.password;

    return this.basePost("/auth/login.do", body);
  }

  /**
   * 注册
   * @param user
   * @returns {Observable<R>}
   */
  public regist(user: any): Observable<string> {

    let body = 'name='+user.username+'&uaccount='+user.phoneNo+'&upasswd='+user.password;

    return this.basePost("/auth/reg.do", body);
  }

  /**
   * 获取用户信息
   * @returns {Observable<any>}
   */
  public getUserInfo(): Observable<MakerInfo> {

    return this.basePost("/auth/myinfo.do");
  }

  /**
   * 查看当前物业公司指定园区的户型信息
   * @param gardenid
   * @returns {Observable<any>}
   */
  public gardenListStyle(gardenid?: number): Observable<GarDenStyleBean[]> {

    if (gardenid) {
      let body = 'gardenid='+gardenid;
      return this.basePost("/garden/liststyle.do", body);
    } else {
      let body = 'gardenid=2';
      return this.basePost("/garden/liststyle.do", body);
    }

  }

  /**
   * 查看当前物业公司指定园区的房源信息
   * @returns {Observable<any>}
   * @param gardenDetail
   */
  public gardenListHouse(gardenDetail: GarDenStyleBean): Observable<any> {

    let body = 'gardenid='+gardenDetail.gid+'&styleid='+gardenDetail.id;

    return this.basePost("/house/listhouse.do", body);
  }

  /**
   * 查看租赁协议
   * @returns {Observable<any>}
   */
  public contractContent():Observable<ContractInfoBean> {

    return this.basePost("/contract/platbase.do");
  }

  /**
   * 同意协议
   * @param agree
   * @param id
   * @returns {Observable<any>}
   */
  public contractAgree():Observable<any> {

    return this.basePost("/contract/agreeplatbase.do");
  }

  /**
   * 预约看房
   * @param styleid
   * @param booking
   * @returns {Observable<any>}
   */
  public houseAppointMent(styleid: number, booking: any):Observable<any> {

    let body = 'styleid='+styleid+'&time='+booking.changeDate+'&phone='+booking.phoneNo;

    return this.basePost("/house/appointment.do", body);
  }

  /**
   * 查看租户所在物业园区的公告
   * @param pageno
   * @returns {Observable<any>}
   */
  public listNotice(pageno: number): Observable<NoticeInfo[]> {
    let body = 'pageno='+pageno;

    return this.basePost("/notice/listnotice.do", body);
  }

  /**
   * 提交报修
   * @param formDetail
   * @param imgs
   * @param houseid
   * @returns {Observable<any>}
   */
  public repairApply(formDetail: any, imgs: string, houseid: string):Observable<any> {

    let body = 'msg='+formDetail.repairContent+'&phone='+formDetail.masterPhoneNo+'&name='+formDetail.masterName
      +'&gender='+formDetail.masterSex+'&houseid='+houseid+'&time='+formDetail.changeDate+'&inhome='+formDetail.masterAtHome+'&img='+imgs;

    return this.basePost("/repair/apply.do", body);
  }

  /**
   * 获取维修单列表
   * @param pageno
   * @returns {Observable<any>}
   */
  public getRepairApplyList(pageno: number):Observable<RepairInfo[]> {

    let body = 'pageno='+pageno;

    return this.basePost("/repair/list.do", body);
  }

  /**
   * 评价（综合接口）
   * @param uri
   * @param id
   * @param star
   * @param msg
   * @returns {Observable<any>}
   */
  public scoreItem(uri: string, id: number, star: number, msg: string): Observable<RepairInfo[]> {

    let body = 'id='+id+'&star='+star+'&msg='+msg;

    return this.basePost(uri, body);
  }

  /**
   * 支付维修
   * @param id
   * @returns {Observable<any>}
   */
  public payRepair(id: number): Observable<any> {

    let body = 'id='+id;

    return this.basePost("/repair/pay.do", body);
  }



  /**
   * 提交保洁
   * @param formDetail
   * @param imgs
   * @param houseid
   * @returns {Observable<any>}
   */
  public cleanApply(formDetail: any, houseid: string):Observable<any> {

    let body = 'msg='+formDetail.cleanContent+'&phone='+formDetail.masterPhoneNo+'&name='+formDetail.masterName
      +'&gender='+formDetail.masterSex+'&houseid='+houseid+'&time='+formDetail.changeDate+'&inhome='+formDetail.masterAtHome+'&img='+formDetail.comment;

    return this.basePost("/clean/apply.do", body);
  }

  /**
   * 获取保洁单列表
   * @param pageno
   * @returns {Observable<any>}
   */
  public getCleanApplyList(pageno: number):Observable<CleanInfo[]> {

    let body = 'pageno='+pageno;

    return this.basePost("/clean/list.do", body);
  }

  /**
   * 支付保洁
   * @param id
   * @returns {Observable<any>}
   */
  public payClean(id: number): Observable<any> {

    let body = 'id='+id;

    return this.basePost("/clean/pay.do", body);
  }


  /**
   * 邮件代收申请
   * @param formDetail
   * @param houseid
   * @returns {Observable<any>}
   */
  public mailApply(formDetail: any, houseid: string): Observable<any> {

    let body = 'mailcom='+formDetail.mailCompany+'&mailno='+formDetail.mailNo+'&phone='+
      formDetail.masterPhoneNo+'&name='+formDetail.masterName+'&gender='+formDetail.masterSex+'&houseid='+houseid;

    return this.basePost("/mail/apply.do", body);
  }

  /**
   * 获取邮件详情
   * @param id
   * @returns {Observable<any>}
   */
  public getMailDetail(id: number): Observable<MailInfo> {

    let body = 'id='+id;

    return this.basePost("/mail/detail.do", body);
  }

  /**
   * 获取邮件列表
   * @param pageno
   * @param finished
   * @returns {Observable<any>}
   */
  public getMailApplyList(pageno: number, finished: boolean): Observable<MailInfo[]> {

    let body = 'pageno='+pageno+'&finished='+finished;

    return this.basePost("/mail/list.do", body);
  }

  /**
   * 查看指定户型的可租房源信息
   * @returns {Observable<any>}
   * @param gardenDetail
   */
  public waitRentHouseList(gardenDetail: GarDenStyleBean): Observable<HouseSimpleBean[]> {

    let body = 'styleid='+gardenDetail.id;

    return this.basePost("/rent/listhouse.do", body);
  }

  /**
   * 查询房源的信息，供租约参考
   * @param id
   * @returns {Observable<any>}
   */
  public getRentHouseInfo(id: string): Observable<HouseToRentInfo> {

    let body = 'houseid='+id;

    return this.basePost("/rent/houseinfo.do", body);
  }


  /**
   * 租约价格计算,显示到付款栏中，供用户付款
   * @param houseid
   * @param funitures
   * @param count
   * @returns {Observable<any>}
   */
  public getRentMoney(houseid: string, funitures: string, count: number): Observable<number> {

    let body = 'houseid='+houseid+'&funitures='+funitures+'&count='+count;

    return this.basePost("/rent/rentmoney.do", body);
  }

  /**
   *
   * @param houseid
   * @param funitures
   * @param count
   * @param money
   * @returns {Observable<any>}
   */
  public doRentHouse(houseid: string, funitures: string, count: number, money: number): Observable<PayBillInfo> {

    let body = 'houseid='+houseid+'&funitures='+funitures+'&count='+count+'&money='+money;

    return this.basePost("/rent/rent.do", body);
  }

  /**
   * 租约付费结果上传
   * @param billid
   * @param result
   * @returns {Observable<any>}
   */
  public updateRentState(billid: string, result: boolean): Observable<any> {

    let body = 'billid='+billid+'&result='+result;

    return this.basePost("/rent/rentpayresult.do", body);
  }

  /**
   * 退租发起
   * @param formData
   * @returns {Observable<any>}
   */
  public doUnrent(formData: any): Observable<any> {

    let body = 'bankcard='+formData.bankcard+'&bankname='+formData.bankname+
      '&bankusrname='+formData.bankusrname+'&bankusridcard'+formData.bankusridcard;

    return this.basePost("/money/unrent.do", body);
  }

  /**提取用户某项费用缴费信息
   *
   * @param feetype
   * @returns {Observable<any>}
   */
  public getPaymentInfo(feetype: number): Observable<MoneyFeeInfo> {

    let body = 'feetype='+feetype;

    return this.basePost("/money/info.do", body);
  }

  /**
   * 用户某项费用缴费
   * @param formData
   * @returns {Observable<any>}
   */
  public doPayMoney(formData: any): Observable<PayBillInfo> {

    let body = 'paymoney='+formData.paymoney+'&feetype='+formData.feetype+
      '&count='+formData.count+'&furnitures='+formData.furnitures;

    return this.basePost("/money/pay.do", body);
  }

  /**
   * 费用缴纳结果上传
   * @param billid
   * @param result
   * @returns {Observable<any>}
   */
  public postPayResult(billid: string, result: boolean): Observable<any> {

    let body = 'billid='+billid+'&result='+result;

    return this.basePost("/money/payresult.do", body);
  }

  /**
   * 用户某项费用缴费记录
   * @param feetype
   * @param pageno
   * @returns {Observable<any>}
   */
  public getPayHistoryList(feetype: number, pageno: number): Observable<MoneyPayInfo[]> {

    let body = 'feetype='+feetype+'&pageno='+pageno;

    return this.basePost("/money/history.do", body);
  }

  /**
   * 用户某项费用计费
   * @param formData
   * @returns {Observable<any>}
   */
  public getPayMoneyResult(formData: any): Observable<number> {

    let body = 'paymoney='+formData.paymoney+'&feetype='+formData.feetype+
      '&count='+formData.count+'&furnitures='+formData.furnitures;

    return this.basePost("/money/paymoney.do", body);
  }

}
