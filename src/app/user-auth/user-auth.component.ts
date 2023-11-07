import { Component } from '@angular/core';
import { Login, SingUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError: string = "";

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.userAuthReload()
  }

  signUp(data: SingUp) {
    console.log(data);
    this.user.userSignUp(data)
  }

  login(data: Login) {
    console.log(data);
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.log("invalidUserAuth : ", result);
      if (result) {
        this.authError = "User Not found"
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }

}
