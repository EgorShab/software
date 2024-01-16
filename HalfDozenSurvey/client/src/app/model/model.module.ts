import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { RestDataSource } from "./rest.datasource";
import { SurveyResponseRepository } from "./surveyResponse.service";
import { SurveyTemplateRepository } from "./surveyTemplate.service";
import { UserService } from "./user.service";

@NgModule({
    imports: [HttpClientModule],
    providers: [
        SurveyTemplateRepository, SurveyResponseRepository, RestDataSource, AuthService, UserService
    ]
})
export class ModelModule {}