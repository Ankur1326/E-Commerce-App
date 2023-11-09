import { Component } from '@angular/core';
import { Cart, Login, Product, SingUp } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit() {
    this.user.userAuthReload()
  }

  signUp(data: SingUp) {
    console.log(data);
    this.user.userSignUp(data)
  }

  login(data: Login) {
    console.log(data);
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result) => {
      console.log("invalidUserAuth : ", result);
      if (result) {
        this.authError = "User Not found"
      }
      else {
        this.localCartToRemoteCart()
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart')
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: Product[] = JSON.parse(data)
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        }
        // delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("Data is stored in DB", result);
            }
          })
        }, 500)
        if (cartDataList.length === index+1) {
          localStorage.removeItem("localCart")
        }
      });
    }

    this.product.getCartList(userId)
  }

}
