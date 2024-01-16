import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class UserService {
    constructor(private datasource: RestDataSource) {}

    public getUser(userId: string): Observable<string> {
        return this.datasource.getUser(userId);
    }
}