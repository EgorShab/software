import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";
import { SurveyResponse } from "./surveyResponse.model";

@Injectable()
export class SurveyResponseRepository {

    constructor(private dataSource: RestDataSource) {}

    getResponses(surveyId: string): Observable<SurveyResponse[]> {
        return this.dataSource.getSurveyResponses(surveyId);
    }
    
    saveResponse(surveyResponse: SurveyResponse): Observable<SurveyResponse> {
        return this.dataSource.saveSurveyResponse(surveyResponse);
    }
}