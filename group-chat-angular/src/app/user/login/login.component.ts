import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppService } from './../../app.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;
  public emailNeed = 1;

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
    if (Cookie.get('receiverId')) {
      this.router.navigate(['/chat']);

    }
  }

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } // end goToSignUp

  public signinFunction: any = () => {

    if (!this.email) {
      this.toastr.warning('enter email');


    } else if (!this.password) {

      this.toastr.warning('enter password');


    } else {

      const data = {
        email: this.email,
        password: this.password
      };

      this.appService.logInFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            console.log(apiResponse);

             Cookie.set('authtoken', apiResponse.data.authToken);
             Cookie.set('receiverId', apiResponse.data.userDetails.userId);
             Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);

             this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails);
             this.router.navigate(['/chat']);

          } else {

            this.toastr.error(apiResponse.message);
            console.log(apiResponse.message);

          }

        }, (err) => {
          this.toastr.error('some error occured');

        });

    } // end condition

  } // end signinFunction

  public forgotPassword = (email): any => {
    if (email === undefined) {
      this.emailNeed = 0;
    } else {
      console.log(email);
      this.appService.forgotPassword(email).subscribe(
        Response => {
          if (Response.status === 200) {
            this.toastr.success('Mail has been sent.Check for further process!');
            setTimeout(() => {
              this.router.navigate(['/login']);
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
