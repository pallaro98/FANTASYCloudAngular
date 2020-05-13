import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  invokeUrl = 'https://ast0b1w1p1.execute-api.us-east-1.amazonaws.com/pruebas';
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };
  constructor(private httpClient: HttpClient) { }

  loginvalidate(user, pass): Promise<any> {

    return new Promise((resolve, reject) => {

      const body = JSON.stringify({username: user, password: pass});

      this.httpClient.post(this.invokeUrl + '/users/login', body).subscribe(users => {
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

  registervalidate(username, password, email): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify({username, password, email});

      this.httpClient.post(this.invokeUrl + '/users/register', body, {responseType: 'json'})
        .subscribe(response => {
        console.log('In registervalidate: ', response);
        let objectid = response['body']['objectid'];
        let imageUri = response['body']['image'];
        this.currentuser = new User(objectid, username, imageUri, password, email);
        this.currentusername.next(username);
        this.currentuserimage.next(imageUri);
        this.userLogged = true;
        console.log(this.currentuser);
        if(Number(response['statusCode'] !== 200))
          reject();
        else
          resolve(this.currentuser);
      });
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

