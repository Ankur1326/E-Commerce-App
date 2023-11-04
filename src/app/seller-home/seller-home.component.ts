import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: undefined | Product[];
  deleteIcon = faTrash
  updateIcon = faEdit
  constructor(private Product: ProductService) { }

  list() {
    this.Product.productList().subscribe((result) => {
      // console.log(result);
      this.productList = result;
      // console.log(this.productList);
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