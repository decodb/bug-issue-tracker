import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProjectService {
    private httpClient = inject(HttpClient)
    projectsUrl = "http://localhost:3001/api/admin/projects";

    getProjects(managerId: string) {
        const headers = new HttpHeaders({
            'managerId': managerId
        });

        return this.httpClient.get<any>(this.projectsUrl, {headers});
    }
}