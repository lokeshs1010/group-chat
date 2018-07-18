import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;

  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
  };

this.myParams = {
      particles: {
          number: {
              value: 200,
          },
          color: {
              value: '#ff0000'
          },
          shape: {
              type: 'star',
          },
  }
};
  }

  public goToSignIn: any = () => {

    this.router.navigate(['/']);

  } // end goToSignIn

  public signupFunction: any = () => {

    if (!this.firstName) {
      this.toastr.warning('enter first name');

    } else if (!this.lastName) {
      this.toastr.warning('enter last name');

    } else if (!this.mobile) {
      this.toastr.warning('enter mobile');

    } else if (!this.email) {
      this.toastr.warning('enter email');
    } else if (!this.password) {
      this.toastr.warning('enter password');
    } else {

      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password
      };

      console.log(data);

      this.appService.signupFunction(data)
        .subscribe((apiResponse) => {

          console.log(apiResponse);

          if (apiResponse.status === 200) {

            this.toastr.success('Signup successful');

            setTimeout(() => {

              this.goToSignIn();
              this.toastr.success('Please confirm your email before login.');

            }, 2000);

          } else {

            this.toastr.error(apiResponse.message);

          }

        }, (err) => {

          this.toastr.error('some error occured');

        });

    } // end condition

  } // end signupFunction

}
