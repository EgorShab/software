import { Option } from "./option.model";

export class Question {
    public _id: string = (Math.random() + 1).toString(36).substring(7);
    public questionNumber?: number;
    public questionText?: string;
    public questionOptions: string[] = [];
    public questionOptionObjs: Option[] = [];
}