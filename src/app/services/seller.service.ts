import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SingUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data:SingUp) {
    this.http.post("http://localhost:3000/seller", data, {observe: 'response'})
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true)
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
        console.log(result);
        
      })
  }

  reloadSeller(): void {
    this.isSellerLoggedIn.next(true)
    if (localStorage.getItem('seller')) {
      this.router.navigate(['seller-home'])
    }
  }
}
