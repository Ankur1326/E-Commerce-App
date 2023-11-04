import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, SingUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SingUp) {
    this.http.post("http://localhost:3000/seller", data, { observe: 'response' })
      .subscribe((result: any) => {
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      })
  }

  reloadSeller(): void {
    this.isSellerLoggedIn.next(true)
    if (localStorage.getItem('seller')) {
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: Login) {
    // console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      console.log(result.body[0]);
      if (result && result.body && result.body.length) {
        console.log("you are logged In");
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      } else {
        console.log('logged In failed');
        this.isLoginError.emit(true)
      }
    })
  }
}
