import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Scripts } from '@/models';

@Injectable({ providedIn: 'root' })
export class ScriptsService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<{ scripts: Scripts[] }>(`${config.apiUrl}/scripts`);
    }
    adminGetAll() {
        return this.http.get<{ scripts: Scripts[] }>(`${config.apiUrl}/admin/scripts`);
    }
    get(id: string) {
        return this.http.get<{ script: Scripts }>(`${config.apiUrl}/scripts/${id}`);
    }
    put(_id: string, script: Scripts) {
        return this.http.put<{ script: Scripts }>(`${config.apiUrl}/scripts/${_id}`, script);
    }

    create(Script: Scripts) {
        return this.http.post<{ script: Scripts }>(`${config.apiUrl}/scripts/`, Script);
    }

    delete(id: string) {
        return this.http.delete(`${config.apiUrl}/scripts/${id}`);
    }

    runScript(_id: string) {
        return this.http.get<{ script: Scripts }>(`${config.apiUrl}/scripts/${_id}/run`);
    }
}