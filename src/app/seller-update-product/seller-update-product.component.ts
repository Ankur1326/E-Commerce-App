import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  productData: undefined | Product;
  updateSuccessfullyMsg: undefined | string;
  
  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id') // get id
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      // console.log(data);
      this.productData = data
    })
  }

  submit(data: Product) {
    // console.log(data);
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      console.log(result);
      
      if (result) {
        this.updateSuccessfullyMsg = "This Product is successfully updated"
      }
    })
    
  }

}
