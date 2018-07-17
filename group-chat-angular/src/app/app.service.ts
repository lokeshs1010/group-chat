import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class AppService {

  private url =  'http://localhost:3000/api/v1';

  constructor(
    public http: HttpClient
  ) {

  } // end constructor


  public getUserInfoFromLocalstorage = () => {

    return JSON.parse(localStorage.getItem('userInfo'));

  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) => {

    localStorage.setItem('userInfo', JSON.stringify(data));
    console.log(data);
  }

  public signupFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobileNumber', data.mobile)
      .set('email', data.email)
      .set('password', data.password );

    return this.http.post(`${this.url}/users/signup`, params);

  } // end of signupFunction function.

  public logInFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/users/login`, params);
  } // end of signinFunction function.


  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'));

    return this.http.post(`${this.url}/users/logout`, params);

  } // end logout function

  public verifyEmail = (data): Observable<any> => {
    const param = new HttpParams()
      .set('hash', data);

    return this.http.put(`${this.url}/users/verifyEmail`, param);
  }

  public forgotPassword = (email): Observable<any> => {
    const param = new HttpParams()
      .set('email', email);

    return this.http.post(`${this.url}/users/forgotPassword`, param);
  }

  public resetPassword = (data): Observable<any> => {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);
    return this.http.put(`${this.url}/users/resetPassword`, params);


  }

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

    } // end condition *if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  }  // END handleError

  public createGroup = (data, authToken): Observable<any> => {
    const params = new HttpParams()
    .set('name', data.name)
    .set('creator', data.creator);

  return this.http.post(`${this.url}/group/createGroup?authToken=${authToken}`, params);
  }

  public editGroup = (data, authToken): Observable<any> => {
    const params = new HttpParams()
    .set('name', data.name);
  return this.http.put(`${this.url}/group/${data.roomId}/editGroup?authToken=${authToken}`, params);
  }


  public deleteGroup = (roomId, authToken): Observable<any> => {
    const data = {};
    return this.http.post(`${this.url}/group/${roomId}/deleteGroup?authToken=${authToken}`, data);
  }

  public close = (roomId, authToken): Observable<any> => {
    const data = {};
    return this.http.put(`${this.url}/group/${roomId}/markAsClose?authToken=${authToken}`, data);
  }

  public getChatGroup = (authToken): Observable<any> => {
    return this.http.get(`${this.url}/group/getChatGroup?authToken=${authToken}`);
  }

  public getChatsForGroup(receiverId, skip): Observable<any> {

    return this.http.get(`${this.url}/group/chat/get/for/group?receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authtoken')}`)
      .do(data => console.log('Data Received'))
      .catch(this.handleError);
  }

  public shareLink = (data, authToken): Observable<any> => {
    const params = new HttpParams()
    .set('email', data.email)
    .set('roomId', data.roomId)
    .set('roomName', data.roomName);
    return this.http.post(`${this.url}/group/shareLink?authToken=${authToken}`, params);
  }
}
