import { Component, OnInit} from '@angular/core';
import { SocketService } from './../../socket.service';
import { AppService } from './../../app.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})

export class ChatBoxComponent implements OnInit {


  public authToken: any;
  public messageText: any;
  public messageList: any = [];
  public unreadMsgList: any = [];
  public disconnectedSocket: boolean;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public chatRooms: any = [];
  public joinRooms: any = [];
  public pageValue = 0;
  public loadingPreviousChat = false;
  public scrollToChatTop = false;
  public param1: string;
  public param2: string;
  public param3: string;
  public unreadList: any = [];
  public unreadOfflineList: any = [];
  public count;
  public typingUserName: any = '';
  public typingUserId: String = '';
  public roomId: any;


  constructor(
    public appService: AppService,
    public socketService: SocketService,
    public router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService) {
    this.receiverId = Cookie.get('receiverId');

    this.receiverName = Cookie.get('receiverName');
  }



  ngOnInit() {
    this.authToken = Cookie.get('authtoken');
    this.receiverId = Cookie.get('receiverId');

    this.receiverName = Cookie.get('receiverName');
    console.log(this.authToken);
    this.userInfo = this.appService.getUserInfoFromLocalstorage();
    this.appService.getChatGroup(this.authToken).subscribe(
      Response => {
        this.chatRooms = Response.data;
        this.userList = [];
        if (this.chatRooms !== null) {
          for (const i of this.chatRooms) {
            i.chatting = 'false';

          }
        }
        console.log(this.chatRooms);
      },
      error => {
        this.toastr.error('some error occured');
      });

    // this part is for joining room via link
    this.param1 = this._route.snapshot.paramMap.get('roomId');
    this.param2 = this._route.snapshot.paramMap.get('roomName');
    if (this.param1 && this.param2) {
      this.param2 = atob(this.param2);
      this.roomJoining(this.param1, this.param2);
      this.roomSelectedToChat(this.param1, this.param2);
    }
    // end
    if (this.receiverId != null && this.receiverId !== undefined && this.receiverId !== '') {
      this.roomSelectedToChat(this.receiverId, this.receiverName);
    }


    this.verifyUserConfirmation(this.authToken);

    this.getMessageFromAUser();
    this.getOnTypingData();
    this.setJoinedRoom();
  }



  public verifyUserConfirmation: any = (token) => {
    this.socketService.verifyUser().subscribe(
      (data) => {

        this.disconnectedSocket = false;
        this.socketService.setUser(token);

        this.getOnlineUserList();
      });
  }// end


  //  Online user list methdlist start
  public getOnlineUserList: any = () => {

    this.socketService.onlineUserList()
      .subscribe((userList) => {

        this.userList = [];
        for (const i of userList) {
          const temp = { 'userId': i.userId, 'name': i.fullName, 'unread': 0, 'chatting': false };
          this.userList.push(temp);
        }
        console.log(this.userList);



      }); // end online-user-list

  } // online userlist method end

  // Method to select a room for chatting
  public roomSelectedToChat = (roomId, roomName) => {
    console.log('clicked');
    this.chatRooms.map((room) => {
      if (room.roomId === roomId) {
        room.chatting = true;
      } else {
        room.chatting = false;
      }

    });
    Cookie.set('receiverId', roomId);

    Cookie.set('receiverName', roomName);

    this.receiverName = roomName;

    this.receiverId = roomId;

    this.messageList = [];

    this.pageValue = 0;
    this.getPreviousChatWithAUser();



  }// end select room

  // method to check whether the user has joined chat room or not
  public joinRoomStatus = (roomId): boolean => {
    if (this.joinRooms.length > 0) {
      if (this.joinRooms.indexOf(roomId) !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false; // no room join
    }
  }// end

  // method to start room joining process
  public roomJoining = (roomId, roomName) => {
    console.log('clicked join room');
    const name = `${this.userInfo.firstName} ${this.userInfo.lastName}`;
    this.socketService.joinRoom(roomId, roomName, name);


  }// end

  // method to get message from serverabout joining
  public setJoinedRoom = () => {
    this.socketService.setJoinedRoom().subscribe(
      data => {
        console.log(data);
        this.joinRooms.push(data.roomId);
        this.joinRooms = this.joinRooms.filter((val, index) => {
          return this.joinRooms.indexOf(val) === index;
        });
        console.log(data.roomId);
        const name = `${this.userInfo.firstName} ${this.userInfo.lastName}`;
        if (data.joinedUser === name) {
          this.toastr.success(`You have Joined ${data.roomName} room`);
        } else {
          this.toastr.success(`${data.joinedUser} have Joined ${data.roomName} room`);
        }

        console.log(this.joinRooms);
      }
    );

  }// end

  // method to send message using enter
  public sendMessageUsingKeypress: any = (event: any) => {

    if (event.keyCode === 13) { // 13 is keycode of enter.

      this.sendMessage();

    }

  } // end sendMessageUsingKeypress


  // Method to send message
  public sendMessage: any = () => {

    if (this.messageText) {

      const chatMsgObject = {
        senderName: this.userInfo.firstName + ' ' + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: Cookie.get('receiverName'),
        receiverId: Cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      }; // end chatMsgObject

      this.socketService.SendChatMessage(chatMsgObject);
      this.pushToChatWindow(chatMsgObject);



    } else {
      this.toastr.warning('text message can not be empty');

    }

  } // end sendMessage

  // Method to push your chats to chat window
  public pushToChatWindow: any = (data) => {

    this.messageText = '';


    this.messageList.push(data);
    this.scrollToChatTop = false;


  }// end push to chat window

  // Method to get all messages from all users of chat Room
  public getMessageFromAUser: any = () => {

    this.socketService.chatByRoomId()
      .subscribe((data) => {
        if (data.senderId === this.typingUserId) {

          this.roomId = '';
          this.typingUserName = '';
        }

        (this.receiverId === data.receiverId) ? this.messageList.push(data) : '';
        /* this.unreadMessages();  */
        this.toastr.success(`${data.senderName} says : ${data.message}`);
        this.scrollToChatTop = false;

      }); // end subscribe

  }// end get message from a use

  // Getting previous messages f chat Room
  public getPreviousChatWithAUser: any = () => {
    const previousData = (this.messageList.length > 0 ? this.messageList.slice() : []);

    this.appService.getChatsForGroup(this.receiverId, this.pageValue * 10)
      .subscribe((apiResponse) => {


        if (apiResponse.status === 200) {

          this.messageList = apiResponse.data.concat(previousData);

        } else {

          this.messageList = previousData;
          this.toastr.warning('No Messages available');
        }

        this.loadingPreviousChat = false;

      }, (err) => {

        this.toastr.error('some error occured');


      });

  }// end

  // This is for typing,it notifies evry1 of room that who is typing
  public onTyping = (event: any) => {

    // when enter is pressed then typing emit event should not be called
    if (event.keyCode !== 13) {
      const data = {
        'typingUser': this.userInfo.firstName,
        'typingUserId': this.userInfo.userId,
        'roomId': this.receiverId
      };
      // this is for when user types but clear the message text then evry1 should notify that now user is not typing
      if (this.messageText === '') {
        const data = {
          'typingUser': '',
          'typingUserId': '',
          'roomId': this.receiverId
        };

        this.socketService.typing(data);

      } // end

      // this is when user is typing then everyone should get notification that someone is typing
      if (this.messageText !== '') {

        console.log(`typing`);

        this.socketService.typing(data);

      }
    }


  }// end onTyping function

  // function to get data of ontyping like who is typing and room Id info
  public getOnTypingData = () => {
    this.socketService.getTypingUser().subscribe(
      (typedUserData) => {

        this.typingUserName = typedUserData.typingUser;
        this.typingUserId = typedUserData.typingUserId;
        this.roomId = typedUserData.roomId;
        console.log(this.roomId);
        this.toastr.success(`${this.typingUserName} is typing`);



      }
    );

  }// end

  public loadEarlierPageOfChat: any = () => {

    this.loadingPreviousChat = true;

    this.pageValue++;
    this.scrollToChatTop = true;

    this.getPreviousChatWithAUser();

  } // end

  public logout: any = () => {

    this.appService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log('logout called');
          Cookie.delete('authtoken');

          Cookie.delete('receiverId');

          Cookie.delete('receiverName');

          this.socketService.exitSocket();

          this.router.navigate(['/']);

        } else {
          this.toastr.error(apiResponse.message);

        } // end condition

      }, (err) => {
        this.toastr.error('some error occured');


      });

  } // end logout


}
