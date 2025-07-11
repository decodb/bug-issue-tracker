import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

export interface Project {
    name : string | null,
    description : string | null,
    status: string | null
}

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

    createProject(projectInfo : Project) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        return this.httpClient.post<any>("http://localhost:3001/api/admin/createProject", projectInfo , {headers})
    }
}