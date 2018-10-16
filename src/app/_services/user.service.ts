import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }
}