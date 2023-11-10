import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData: undefined | Product;
  removeCart: boolean = false
  cartData: Product | undefined
  
  constructor(private product: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {

    let productId = this.route.snapshot.paramMap.get('productId')

    // console.log(productId);

    productId && this.product.getProduct(productId).subscribe((result) => {
      // console.log(result);
      this.productData = result

      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items: Product[] = JSON.parse(cartData)
        items = items.filter((item: Product) => productId === item.id.toString())

        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false
        }
      }

      let user = localStorage.getItem('user')
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId)

        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => productId?.toString() === item.productId.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true
          }
        })

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
      } else {
        console.log('user is logged in');
        let user = localStorage.getItem('user');
        let userId: number = user && JSON.parse(user).id;

        let cartData: Cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;

        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId)
            this.removeCart = true
          }
        })
      }
    }

  }

  removeToCard(productId: undefined | number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId)
      
    }else {
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId: number = user && JSON.parse(user).id;
        this.product.getCartList(userId)
      })
    }
    this.removeCart = false;
  }

  buyNow(productId: number) {
    alert('This feature is not implemented ')
  }
}
