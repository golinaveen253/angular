import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

import {TOKEN_NAME} from '../services/auth.constant';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable()
export class UserService {
  jwtHelper: JwtHelper = new JwtHelper();
  accessToken: string;
  isAdmin: boolean;

  constructor(private http: HttpClient) {
  }

  login(accessToken: string) {
    const decodedToken = this.jwtHelper.decodeToken(accessToken);
    console.log(decodedToken);

    this.isAdmin = decodedToken.authorities.some(el => el === 'ADMIN_USER');
    this.accessToken = accessToken;

    localStorage.setItem(TOKEN_NAME, accessToken);
  }

  logout() {
    this.accessToken = null;
    this.isAdmin = false;
    localStorage.removeItem(TOKEN_NAME);
  }

  isAdminUser(): boolean {
    return this.isAdmin;
  }

  isUser(): boolean {
    return this.accessToken && !this.isAdmin;
  }

  getAll() {
    return this.http.get<User[]>('/api/users');
}

getById(id: number) {
    return this.http.get('/api/users/' + id);
}

create(user: User) {
    return this.http.post('/api/users', user);
}

update(user: User) {
    return this.http.put('/api/users/' + user.id, user);
}

delete(id: number) {
    return this.http.delete('/api/users/' + id);

}

}
