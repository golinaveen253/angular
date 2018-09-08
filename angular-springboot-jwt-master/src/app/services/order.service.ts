import {Injectable} from '@angular/core';
import {JwtHelper} from 'angular2-jwt';

import {TOKEN_NAME} from '../services/auth.constant';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Work } from '../model/work';
import { Order } from '../model/order';


@Injectable()
export class OrderService {

    constructor(private http: HttpClient){

    }

    getAllTypeOfWorks() {
        return this.http.get<Work[]>('/order/works');
    }

    public saveOrder(order){
        return this.http.post('/order/save', order);
    }
}