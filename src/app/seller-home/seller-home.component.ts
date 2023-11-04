import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import {  } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  constructor(private Product: ProductService) { }

  list() {
    this.Product.productList().subscribe((result) => {
      console.log(result);
      this.productList = result;
      console.log(this.productList);
    })
  }

  ngOnInit() {
    this.list();
  }

  removeProduct(id: number) {
    this.Product.deleteProduct(id)
    this.list();
  }
}
