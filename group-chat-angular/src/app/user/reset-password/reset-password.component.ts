import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public password: any;
  public confirmPassword: any;
  public notMatch = 0;

  constructor(private _route: ActivatedRoute,
     public appservice: AppService,
     public router: Router,
     private toastr: ToastrService) {}

  ngOnInit() {
  }

  public goToSignUp = () => {
    this.router.navigate(['/sign-up']);
  }

  public resetPassword = () => {
    const encodedEmail = this._route.snapshot.paramMap.get('id');
    const decodedEmail = atob(encodedEmail);
    const finalEmail = decodedEmail.substr(0, decodedEmail.length - 17);
    if (this.password !== this.confirmPassword) {
      this.notMatch = 1;

    } else {
      console.log(finalEmail);
      const data = {
        'email': finalEmail,
        'password': this.password
      };
      this.appservice.resetPassword(data).subscribe(
        Response => {
          if (Response.status === 200) {
              this.toastr.success(Response.message);
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 2000);
          } else {
            this.toastr.error(Response.message);
          }
        },
        error => {
          this.toastr.error(`Some Error Occured!`);
        });
    }
  }

}
