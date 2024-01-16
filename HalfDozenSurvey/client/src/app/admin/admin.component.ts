import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";
import { User } from "../model/user.model";

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    public user: User;
    public errorMessage: String;

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    updateProfile(form: NgForm) {
        if(form.valid) {
          // perform registration
          this.auth.updateUser(this.user).subscribe(updateUser => {
            if (updateUser.success) {
              this.auth.logout();
              this.auth.authenticate(this.user).subscribe(data => {
                if (data.success) {
                  this.auth.storeUserData(data.token, data.user);
                  this.router.navigateByUrl('/survey');
                }
              });
            }
          });
        }
        else {
          this.errorMessage = 'Form Data Invalid';
        }
      }

    logout(): void {
        this.auth.logout();
        this.router.navigateByUrl('/');
    }
}