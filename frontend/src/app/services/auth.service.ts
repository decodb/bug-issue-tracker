import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";

export interface regUser {
    name: string | null,
    surname: string | null, 
    email: string | null,
    password: string | null,
    role: string
}

export interface logUser {
    email: string | null,
    password: string | null
}

@Injectable({providedIn: "root"})
export class AuthService {
    
    private registerUrl = "http://localhost:3001/api/auth/register";
    private loginUrl = "http://localhost:3001/api/auth/login";

    constructor(private httpClient : HttpClient, private router : Router) {}

    registerUser(userCredentials: regUser){
        return this.httpClient.post<any>(this.registerUrl, userCredentials)
    }

    loginUser(userCredentials: logUser) {
        return this.httpClient.post<any>(this.loginUrl, userCredentials)
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token')
    }
    
    getCurrentUser(): any {
        const token = localStorage.getItem('token');
        if(token) {
            try {
                return jwtDecode(token)
            } catch (e) {
                return null;
            }
        }

        return null;
    }

    getJwtToken = (): string | null => {
        let token: any = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        return token;
    }   

    logout() : void {
        localStorage.removeItem('token');
        this.router.navigate(["/sign-in"]);
    }
}