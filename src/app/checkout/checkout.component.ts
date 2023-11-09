import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, Order } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice: number | undefined; 
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.currentCart().subscribe((result: any) => {
      let price = 0;
      result.forEach((item: Cart) => {
        price = price + (+item.price)
      });
      console.log(price);
      
      this.totalPrice = price + (price / 10) + 100 - (price / 10)
      console.log(this.totalPrice);
    })
  }

  orderNow(data: {email: string, address: string, contact: string}) {
    // console.log(data);
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    let orderData: Order = {
      ...data,
      totalPrice:this.totalPrice,
      userId 
    }

    this.product.orderNow(orderData).subscribe((result) => {
      if (result) {
        alert('Order Placed')
      }
    }) 
  }
}
