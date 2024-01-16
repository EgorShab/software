import { UserResponse } from "./userResponse.model";

export class SurveyResponse {
    public _id: string;
    public displayName: string = '';
    constructor (
        public surveyId?: string,
        public responses?: UserResponse[],
        public userId?: string
    ){
        responses = [];
    }

    public getResponse(questionsId: string): string {
        const response = this.responses.find(response => response.questionId === questionsId);
        return response? response.response : null;
    }
}