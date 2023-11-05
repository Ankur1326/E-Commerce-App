import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchSuggestionResult: undefined | Product[];
  length: number = 5

  constructor(private router: Router, private Product: ProductService) { }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      // console.log(val.url);
      if (val.url) {
        // console.warn(val.url);

        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          // console.log('In seller area');
          this.menuType = 'seller'

          if (localStorage.getItem('seller')) {
            let sellerData = localStorage.getItem('seller')
            let sellerDataInObject = sellerData && JSON.parse(sellerData)
            this.sellerName = sellerDataInObject.name;
          }
        } else {
          // console.log('outside seller');
          this.menuType = 'default'
        }
      }

    })
  }

  logOut() {
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      console.log(element.value);
      this.Product.searchProduct(element.value).subscribe((result: any) => {
        console.log(result);
        
        if (result.length>5) {
          result.length=this.length;
        }
        this.searchSuggestionResult = result
      })
    }
  }


  hideSearchSuggestionResult() {
    this.searchSuggestionResult = undefined;
  }
  
}