import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Scripts } from '@/models';

@Injectable({ providedIn: 'root' })
export class ScriptsService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Scripts[]>(`${config.apiUrl}/scripts`);
    }
    get(id: number) {
        return this.http.get<Scripts>(`${config.apiUrl}/scripts/${id}`);
    }

    register(Scripts: Scripts) {
        return this.http.post(`${config.apiUrl}/scripts/`, Scripts);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/scripts/${id}`);
    }
}