import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData: undefined | Product;
  removeCart: boolean = false
  constructor(private product: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {

    let productId = this.route.snapshot.paramMap.get('productId')

    // console.log(productId);

    productId && this.product.getProduct(productId).subscribe((result) => {
      // console.log(result);
      this.productData = result

      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: Product) => productId === item.id.toString())


        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false
        }

      }
    })
  }

  productQuantity: number = 1;
  handleQuantity(value: string) {
    if (value === 'plus' && this.productQuantity < 20) {
      this.productQuantity++
    }
    else if (this.productQuantity > 1 && value === "minus") {
      this.productQuantity--;
    }
  }

  addToCard() {
    // console.log("productData :", this.productData);

    if (this.productData) {
      this.productData.quantity = this.productQuantity
      if (!localStorage.getItem('user')) { // if user is'nt logged in 
        this.product.localAddToCard(this.productData)
        this.removeCart = true
      }
      // console.log(this.productData);
    }

  }

  removeToCard(productId: undefined | number) {
    this.product.removeItemFromCart(productId)
    this.removeCart = false
    
  }
}
