import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule, Routes } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { ChatRouteGuardService } from './chat-route-guard.service';
import { GroupChatComponent } from './group-chat/group-chat.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild([
      { path: 'chat', component: ChatBoxComponent, canActivate: [ChatRouteGuardService] },
      { path: 'chat/:roomId/:roomName', component: ChatBoxComponent},
      {path: 'group-chat/:roomId', component: GroupChatComponent},
      {path: 'group-chat/:roomId/:roomName', component: GroupChatComponent},
      {path: 'group-chat', component: GroupChatComponent}
    ]),
    SharedModule
  ],
  declarations: [ChatBoxComponent, GroupChatComponent],
  providers: [ChatRouteGuardService]
})
export class ChatModule { }
