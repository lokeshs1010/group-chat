import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { FirstCharComponent } from './first-char/first-char.component';
import { GroupChatComponent } from '../chat/group-chat/group-chat.component';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'group-chat/:roomId/:roomName', component: GroupChatComponent},
      { path: 'group-chat/:roomId', component: GroupChatComponent}
    ])
  ],
  declarations: [UserDetailsComponent, FirstCharComponent],
  exports: [
    UserDetailsComponent,
    FirstCharComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
