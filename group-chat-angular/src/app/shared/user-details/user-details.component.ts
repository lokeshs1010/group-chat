import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userFirstName: any;
  @Input() userLastName: string;
  @Input() userStatus: string;
  @Input() messageRead?: any;
  @Input() roomId: string;
  @Input() list: string;

  public firstChar: string;
  public roomName: string;
  public authToken: any;


  constructor( public appService: AppService,
    private _route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService) {}

  ngOnInit(): void {

      this.firstChar = this.userFirstName[0];
      this.roomName = btoa(this.userFirstName);

  } // end ngOnInit


  // handling the click



}
