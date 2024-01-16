import { Question } from "./question.model";

export class SurveyTemplate {
    public _id: string;
    public name: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public surveyType: string;
    public questions: Question[] = [];
    public userId: string;
    public created: Date;
    public updated: Date;
    public authorName: string;
}