import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

export interface Developer {
    name: string | null,
    surname: string | null, 
    email: string | null,
    password: string | null,
    role: string
}

@Injectable({providedIn: 'root'})
export class DevelopersService {
    private httpClient = inject(HttpClient)
    private developersUrl = "http://localhost:3001/api/admin/employees";
  
    getDataWithToken(managerId: string) {
        
        const headers = new HttpHeaders({
            'managerId': managerId
        });

        return this.httpClient.get<any>(this.developersUrl, { headers });
    }

    fetchDevelopers() {
        return this.httpClient.get<any>(this.developersUrl)
    }

    fetchDeveloperById(id: string) {
        return this.httpClient.get<any>(`http://localhost:3001/api/admin/employee/${id}`)
    }

    deleteDeveloperById(id: string) {
        return this.httpClient.delete<any>(`http://localhost:3001/api/admin/deleteEmployee/${id}`)
    }

    addDeveloper(dev: Developer) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<any>(
        "http://localhost:3001/api/admin/addEmployee",
        dev,
        { headers }
    );
    }
}