import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from './classes/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentuser: User;
  currentusername = new Subject<string>();
  currentuserimage = new Subject<string>();
  userLogged = false;


  constructor(private httpClient: HttpClient) { }

  loginvalidate(user, pass): Promise<any> {

    return new Promise((resolve, reject) => {

      const body = JSON.stringify({username: user, password: pass});

      this.httpClient.post('https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas/users/login', body).subscribe(users => {
        console.log(users);
        if (users !== false) {
          const objectid = users['objectid']['S'];
          const username = users['username']['S'];
          const email = users['email']['S'];
          const password = users['password']['S'];
          const image = users['image']['S'];
          user = new User(objectid, username, image, password, email);
          this.currentuser = user;
          this.currentusername.next(username);
          this.currentuserimage.next(image);
          this.userLogged = true;
          resolve(user);
        }
        reject();
      });
    });
  }

  registervalidate(): Promise<any> {
    return new Promise((resolve, reject) => {
      reject();
    });
  }

  getUser() {
    return this.currentuser;
  }

  closeSession() {
  }

  isUserLogged() {
    return this.userLogged;
  }

}

