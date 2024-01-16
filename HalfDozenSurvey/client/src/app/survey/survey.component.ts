import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { SurveyTemplate } from '../model/surveyTemplate.model';
import { SurveyTemplateRepository } from '../model/surveyTemplate.service';
import { User } from '../model/user.model';
import { UserService } from '../model/user.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  public user: User;
  public surveyTemplates: SurveyTemplate[];

  constructor(
    private repository: SurveyTemplateRepository,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.refresh();
  }

  deleteSurvey(surveyTemplate: SurveyTemplate): void
  {
    this.repository.deleteSurveyTemplate(surveyTemplate).subscribe(data => this.refresh());
  }

  refresh(){
    this.repository.getSurveyTemplates().subscribe(data => {
      data.map(template => this.userService.getUser(template.userId).subscribe(author => template.authorName = author));
      this.surveyTemplates = data;
    });
  }
}
