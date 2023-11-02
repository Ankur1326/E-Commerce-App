import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SellerHomeComponent } from '../seller-home/seller-home.component';
import { SingUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  
  constructor(private seller: SellerService, private router: Router) {}

  ngOnInit() {
    this.seller.reloadSeller();
  }

  singUp(data:SingUp):void {
    // console.log(data);
    this.seller.userSignUp(data)
  }
  
  
}
