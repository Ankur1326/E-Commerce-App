import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';

  constructor(private router: Router) { }

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
}