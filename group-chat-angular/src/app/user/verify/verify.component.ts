import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from './../../app.service';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  public hash: any;
  public success = 0;
  public failure = 0;
  constructor(private _route: ActivatedRoute,
    private router: Router,
    public appservice: AppService) { }

  ngOnInit() {
    this.hash = this._route.snapshot.paramMap.get('hash');
    this.appservice.verifyEmail(this.hash).subscribe(

      Response => {
        if (Response.status === 200) {
          this.success = 1;
        } else {
          this.failure = 1;
        }
        },
      error => {
      });

  } // end ngonit

}
