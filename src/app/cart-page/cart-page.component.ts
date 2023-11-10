import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { Cart, cartPriceSummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  deleteIcon = faTrash
  cartData: Cart[] | undefined;

  cartSummary: cartPriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails()
  }

  removeToCart(cartId: number | undefined) {
    this.cartData && this.product.removeToCart(cartId).subscribe((result) => {
      this.loadDetails()
    })
  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

  loadDetails() {
    this.product.currentCart().subscribe((result: any) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item: Cart) => {
        price = price + (+item.price)
      });
      this.cartSummary.price = price
      this.cartSummary.discount = price / 10
      this.cartSummary.tax = price / 10
      this.cartSummary.delivery = 100
      this.cartSummary.total = price + (price / 10) + 100 - (price / 10)

      if(!this.cartData.length) {
        this.router.navigate(['/'])
      }
    })
  }

}