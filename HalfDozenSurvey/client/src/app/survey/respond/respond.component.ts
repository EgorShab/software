import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SurveyResponse } from 'src/app/model/surveyResponse.model';
import { SurveyResponseRepository } from 'src/app/model/surveyResponse.service';
import { SurveyTemplate } from 'src/app/model/surveyTemplate.model';
import { SurveyTemplateRepository } from 'src/app/model/surveyTemplate.service';
import { User } from 'src/app/model/user.model';
import { UserResponse } from 'src/app/model/userResponse.model';

@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.css']
})
export class RespondComponent implements OnInit {
  public user: User;
  public survey: SurveyTemplate;
  public response: SurveyResponse;

  constructor(
    private templateRepository: SurveyTemplateRepository,
    private responseRepository: SurveyResponseRepository,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.survey = new SurveyTemplate();
    this.response = new SurveyResponse();
    this.templateRepository.getSurveyTemplate(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.survey = data;
      const userResponses = this.survey.questions.map(question => new UserResponse(
        question._id,
        null,
        question,
      ));
      this.response = new SurveyResponse(
        this.survey._id,
        userResponses,
        this.user? this.user.id : null,
      );
    });
  }

  submitResponse(form: NgForm): void {
    if (form.valid) {
      this.responseRepository.saveResponse(this.response).subscribe(() => this.router.navigateByUrl('/survey'))
    }
  }
}
