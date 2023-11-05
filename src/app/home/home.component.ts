import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // imports: [NgbAlert],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts: undefined | Product[]
  trendyProducts: undefined | Product[]
  constructor(private product: ProductService) {}

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data: any) => {
      console.log(data);
      this.popularProducts = data;
    })

    this.product.trendyProducts().subscribe((data: any) => {
      this.trendyProducts = data;
    })
  }
}
