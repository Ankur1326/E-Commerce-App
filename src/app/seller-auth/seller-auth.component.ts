import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { Login, SingUp } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  authError: string = '';
  dataAlreadyExist: boolean = false
  alreadySignedUpMsg = '';

  constructor(private seller: SellerService, private router: Router, private http: HttpClient) { }

  show: boolean = false;

  ngOnInit() {
    this.seller.reloadSeller();
  }

  singUp(data: SingUp): void {
    this.http.get(`http://localhost:3000/seller?name=${data.name}&email=${data.email}`).subscribe((getResult: any) => {

      if (getResult && getResult.length) { 
        this.dataAlreadyExist = true
      } else { // if data is not exit
        this.dataAlreadyExist = false;
        this.seller.userSignUp(data)
      }
    })
  }

  openLoginOrSinUp() {
    this.show = !(this.show)
  }

  Login(data: Login) {
    this.authError = '';
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "❌ Email or Password is not correct"
      }
    })
  }

}
