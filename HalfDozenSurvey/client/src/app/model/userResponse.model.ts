import { Question } from "./question.model";

export class UserResponse {
    public _id?: string;
    constructor (
        public questionId: string,
        public response: string,
        public question: Question,
    ){}
}