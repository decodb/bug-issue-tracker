import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

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
            
}