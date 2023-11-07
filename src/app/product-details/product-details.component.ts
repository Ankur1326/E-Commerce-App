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
  constructor(private product: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {

    let productId = this.route.snapshot.paramMap.get('productId')

    console.log(productId);

    productId && this.product.getProduct(productId).subscribe((result) => {
      console.log(result);
      this.productData = result
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
}
