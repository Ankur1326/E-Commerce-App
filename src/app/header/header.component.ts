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
  userName: string = '';
  cartItem:number = 0;

  constructor(private router: Router, private Product: ProductService) { }

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {

        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          if (localStorage.getItem('seller')) {
            let sellerData = localStorage.getItem('seller')
            let sellerDataInObject = sellerData && JSON.parse(sellerData)
            this.sellerName = sellerDataInObject.name;
            this.menuType = 'seller'
          }

        }
        else if (localStorage.getItem('user')) {
          let userData = localStorage.getItem('user') 
          let sellerDataInObject = userData && JSON.parse(userData)
          this.userName = sellerDataInObject.name;
          this.menuType = "user";
        }
        else {
          this.menuType = 'default'
        }
      }
    })
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
    }
    this.Product.cartData.subscribe((items) => {
      this.cartItem = items.length
    })
  }

  logOut() {
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }
  
  userLogout() {
    localStorage.removeItem('user')
    this.router.navigate(['/user-auth'])
    
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.Product.searchProduct(element.value).subscribe((result: any) => {

        if (result.length > 5) {
          result.length = this.length;
        }
        this.searchSuggestionResult = result
      })
    }
  }

  hideSearchSuggestionResult() {
    this.searchSuggestionResult = undefined;
  }

  redirectToDetails(id: number) {
    this.router.navigate([`details/${id}`])
  }

  submitSearch(value: string) {
    console.log(value);
    this.router.navigate([`search/${value}`])
  }


}