import { HttpClient, HttpHeaders } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

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
}