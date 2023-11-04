import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    console.log("addProduct fun... called");
    console.log(data.name);

    return this.http.post("http://localhost:3000/products", data)
  }
  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products')
  }

  deleteProduct(id: number) {
    this.http.delete(`http://localhost:3000/products/${id}`).subscribe()
  }

}
