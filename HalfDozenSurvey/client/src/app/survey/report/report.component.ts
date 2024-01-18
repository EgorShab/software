import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyResponse } from 'src/app/model/surveyResponse.model';
import { SurveyResponseRepository } from 'src/app/model/surveyResponse.service';
import { SurveyTemplate } from 'src/app/model/surveyTemplate.model';
import { SurveyTemplateRepository } from 'src/app/model/surveyTemplate.service';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/model/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public user: User;
  public survey: SurveyTemplate;
  public surveyResponses: SurveyResponse[];

  constructor(
    private templateRepository: SurveyTemplateRepository,
    private responseRepository: SurveyResponseRepository,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.survey = new SurveyTemplate();
    this.surveyResponses = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.templateRepository.getSurveyTemplate(this.route.snapshot.paramMap.get('id')).subscribe(data => this.survey = data);
    this.responseRepository.getResponses(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      data.map(surveyResponse => this.userService.getUser(surveyResponse.userId).subscribe(author => surveyResponse.displayName = author));
      this.surveyResponses = data;
    });
  }

  getUserResponse(surveyResponse: SurveyResponse, questionId: string) {
    const response = surveyResponse.responses.find(response => response.questionId === questionId);
    return response? response.response : null;
  }

  print(){
    window.print();
  }
}
