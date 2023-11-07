import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private product: ProductService, private route: ActivatedRoute) {}
  searchedProductData: undefined | Product[];
  searchedDataFound: boolean = false;


  ngOnInit() {
    let query = this.route.snapshot.paramMap.get('query')
    console.log("query : ", query);
    
    
    query && this.product.searchProduct(query).subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.searchedProductData = result;
        this.searchedDataFound = false;
      }
      else {
        // this.searchedProductData = ""
        this.searchedDataFound = true;
      }
    })
  }
}
