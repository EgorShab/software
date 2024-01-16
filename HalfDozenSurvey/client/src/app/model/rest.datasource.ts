import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt"
import { User } from "./user.model";
import { SurveyTemplate } from "./surveyTemplate.model";
import { SurveyResponse } from "./surveyResponse.model";

const PROTOCOL = 'http';
const PORT = 3000;
const PROD_DOMAIN = '';
const isProduction = true;

@Injectable()
export class RestDataSource {
    user: User;
    baseUrl: string;
    authToken: string;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        })
    };

    constructor (
        private http: HttpClient,
        private jwtService: JwtHelperService
    ) {
        this.user = new User();
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
        if(isProduction) this.baseUrl = `${PROD_DOMAIN}/api/`;
    }

    getUser(userId: string): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}user/${userId}`, this.httpOptions);
    }

    getSurveyTemplates(): Observable<SurveyTemplate[]> {
        return this.http.get<SurveyTemplate[]>(`${this.baseUrl}survey`, this.httpOptions);
    }

    getSurveyTemplate(surveyTemplateId: string): Observable<SurveyTemplate> {
        return this.http.get<SurveyTemplate>(`${this.baseUrl}survey/edit/${surveyTemplateId}`, this.httpOptions);
    }

    addSurveyTemplate(surveyTemplate: SurveyTemplate): Observable<SurveyTemplate> {
        return this.http.post<SurveyTemplate>(`${this.baseUrl}survey/add`, surveyTemplate, this.httpOptions);
    }

    editSurveyTemplate(surveyTemplate: SurveyTemplate): Observable<SurveyTemplate> {
        return this.http.post<SurveyTemplate>(`${this.baseUrl}survey/edit/${surveyTemplate._id}`, surveyTemplate, this.httpOptions);
    }

    deleteSurveyTemplate(surveyTemplate: SurveyTemplate): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}survey/delete/${surveyTemplate._id}`, this.httpOptions);
    }

    saveSurveyResponse(surveyResponse: SurveyResponse): Observable<SurveyResponse> {
        return this.http.post<SurveyResponse>(`${this.baseUrl}survey/respond/${surveyResponse.surveyId}`, surveyResponse, this.httpOptions);
    }

    getSurveyResponses(surveyId: string): Observable<SurveyResponse[]> {
        return this.http.get<SurveyResponse[]>(`${this.baseUrl}survey/report/${surveyId}`, this.httpOptions);
    }

    register(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}register`, user, this.httpOptions)
    }

    updateUser(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}updateUser`, user, this.httpOptions)
    }
    
    authenticate(user: User): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}login`, user, this.httpOptions)
    }

    storeUserdata(token: any, user: User): void {
        localStorage.setItem('id_token', `Bearer ${token}`);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    logout(): Observable<any>{
        this.authToken = null;
        this.user = null;
        localStorage.clear();

        return this.http.get<any>(`${this.baseUrl}logout`, this.httpOptions);
    }

    loggedIn(): boolean {
        return !this.jwtService.isTokenExpired(this.authToken);
    }

    private loadToken(): void {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
        this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
    }
}