import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

export interface Issue {
    title: string | null,
    description: string | null,
    priority: string | null,
}

@Injectable({providedIn: "root"})
export class IssuesService {
    private httpClient = inject(HttpClient);

    createIssue(data : Issue, projectId: string | null | undefined) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.httpClient.post<any>(`http://localhost:3001/api/admin/project/${projectId}/createIssue`, data, {headers})
    }

    getIssues() {
        return this.httpClient.get<any>("http://localhost:3001/api/admin/issues")
    }

}