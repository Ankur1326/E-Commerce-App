import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Product[]>

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    // console.log("addProduct fun... called");
    // console.log(data.name);

    return this.http.post("http://localhost:3000/products", data)
  }
  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products')
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`).subscribe()
  }

  getProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(product: Product) {
    console.log(product);

    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`, product)
  }

  popularProducts() {
    return this.http.get('http://localhost:3000/products?_limit=3')
  }

  trendyProducts() {
    return this.http.get('http://localhost:3000/products?_limit=8')
  }

  searchProduct(query: string) {
    return this.http.get(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCard(data: Product) {
    let cartData: Product[] = [];
    let localCart = localStorage.getItem('localCart')
    // console.log("localCart : ", localCart);
    // console.log("type of cartDAta : ", cartData);

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify(data))
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCart)
      // Make sure that cartData is al  ways an array
      if (!Array.isArray(cartData)) {
        cartData = [];
      }
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
      this.cartData.emit(cartData)
    }
  }

  removeItemFromCart(productId: undefined | number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: Product[] = JSON.parse(cartData)
      items = items.filter((item: Product) => productId !== item.id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post("http://localhost:3000/cart", cartData)
  }

  getCartList(userId: number) {
    return this.http.get<Product[]>("http://localhost:3000/cart?userId=" + userId, { observe: 'response' })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body)
        }
      })
  }

  removeToCart(cartId: number) {
    return this.http.delete("http://localhost:3000/cart/" + cartId)
  }

  currentCart() {
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore);
    return this.http.get("http://localhost:3000/cart?userId=" + userData.id);
  }

  orderNow(data: Order) {
    return this.http.post("http://localhost:3000/orders", data)
  }

  orderedList() {
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>("http://localhost:3000/orders?userId=" + userData.id);
  }

  deleteCartItem(cartId: number) {
    return this.http.delete("http://localhost:3000/cart/" + cartId).subscribe(() => {
      this.cartData.emit([])
    })
  }

  cancelOrder(orderId: number) {
    return this.http.delete("http://localhost:3000/orders/"+orderId)
  }
}