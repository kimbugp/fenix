import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<{ users: User[] }>(`${config.apiUrl}/users`);
    }

    register(user: User) {
        return this.http.post<{ user: User }>(`${config.apiUrl}/users`, user);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }

    update(id: string, user: User) {
        return this.http.put(`${config.apiUrl}/users/${id}`, user);
    }
}