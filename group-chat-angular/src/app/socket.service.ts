import { Injectable } from '@angular/core';


import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class SocketService {

  private url = 'http://localhost:3000';

  private socket;


  constructor(public http: HttpClient) {
    // connection is being created.
    // that handshake
    this.socket = io(this.url);

  }

  // events to be listened

  public verifyUser = () => {

    return Observable.create((observer) => {

      this.socket.on('verifyUser', (data) => {

        observer.next(data);

      }); // end Socket

    }); // end Observable

  } // end verifyUser

  // emit event
  public setUser = (authToken) => {
    this.socket.emit('setUser', authToken);
    console.log(authToken);
  }

  public onlineUserList = () => {

    return Observable.create((observer) => {

      this.socket.on('online-user-list', (userList) => {

        observer.next(userList);
        console.log(userList);

      }); // end Socket

    }); // end Observable

  } // end onlineUserList
  public joinRoom = (roomId, roomName, joinUser) => {
    const data = {
      'roomId': roomId,
      'roomName': roomName,
      'joinedUser': joinUser
    };
    this.socket.emit('joinRoom', data);
  }

  public setJoinedRoom = () => {
    return Observable.create((observer) => {

      this.socket.on('setJoinedRoom', (joinedRoom) => {

        observer.next(joinedRoom);

      }); // end Socket

    }); // end Observable

  }

  public SendChatMessage = (chatMsgObject) => {

    this.socket.emit('room-msg', chatMsgObject);

  }

  public chatByRoomId = () => {
    return Observable.create((observer) => {
      this.socket.on('receiveMsg', (data) => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  }

  public typing = (data) => {
    this.socket.emit('typing', data);
  }

  public getTypingUser = () => {
    return Observable.create((observer) => {
      this.socket.on('userTyping', (data) => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  }


  public exitSocket = (): any => {
    this.socket.emit('disconnect');
  }

}
