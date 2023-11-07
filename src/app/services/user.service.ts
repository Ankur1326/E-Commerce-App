import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Login, SingUp } from '../data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  signUpSuccMsg: string = '';
  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SingUp) {
    this.http.post('http://localhost:3000/user', data, { observe: 'response' })
      .subscribe((result) => {
        if (result) {
          this.signUpSuccMsg = 'Successfully Sign Up'
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/'])
        }
      })
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }

  userLogin(data: Login) {
    this.http.get<SingUp[]>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, { observe: "response" }).subscribe((result) => {
      console.log(result);
      if (result && result.body?.length) {
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this.router.navigate(['/'])
        this.invalidUserAuth.emit(false)
      }
      else {
        this.invalidUserAuth.emit(true)
      }

    })
  }
}
