/**
 * Created by russell on 2016/12/9.
 */
import { Injectable } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { AccountBean } from '../beans/beans';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class HirerHttpService {
  static API_HOST: string = "http://221.131.92.133:8090/";//"http://221.131.92.133:8090/"; "http://192.168.1.102:3001/"
  static CONTENT_TYPE_APPLICATION: string = "application/x-www-form-urlencoded";

  public accountInfo: AccountBean;

  public isLogin: boolean = false;

  constructor(public http: Http, public app: App, public platform: Platform) {
    this.accountInfo = new AccountBean();
  }

  public extractData(res: Response) {
    let body = res.json();
    if (body.retCode === 0) {
      return body.result;
    }

    if (body.retCode === -20) {
      throw new Error("ErrorNeedLogin");
    } else if (body.retCode === -40 || body.retCode === -50) {
      throw new Error("ErrorPassword");
    } else if (body.retCode === -60) {
      throw new Error("ModifyPasswordError");
    } else {
      throw new Error(body.message || "error");
    }
  }

  public handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    if (errMsg === "ErrorNeedLogin") {
      //this.app.getActiveNav().push(LoginPage);
      return null;
    } else {
      return Observable.throw(errMsg);
    }
  }

  /**
   * login
   */
  public login(user: AccountBean): Observable<AccountBean> {
    let headers = new Headers({'Content-Type': HirerHttpService.CONTENT_TYPE_APPLICATION});
    let searchs = new URLSearchParams();
    searchs.set("phoneNo", user.phoneNo);
    searchs.set("password", user.password);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(HirerHttpService.API_HOST + "Taxi_app_web/json/login", options)
      .map(res => {
        return this.extractData(res);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  /**
   * regist
   * @param user
   * @returns {Observable<R>}
   */
  public regist(user: AccountBean): Observable<AccountBean> {
    let headers = new Headers({'Content-Type': HirerHttpService.CONTENT_TYPE_APPLICATION});
    let searchs = new URLSearchParams();
    searchs.set("username", user.username);
    searchs.set("phoneNo", user.phoneNo);
    searchs.set("password", user.password);

    let options = new RequestOptions({headers: headers, search: searchs});

    return this.http.get(HirerHttpService.API_HOST + "Taxi_app_web/json/login", options)
      .map(res => {
        return this.extractData(res);
      })
      .catch(error => {
        return this.handleError(error);
      });
  }
}
