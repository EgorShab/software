import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Option } from 'src/app/model/option.model';
import { Question } from 'src/app/model/question.model';
import { SurveyTemplate } from 'src/app/model/surveyTemplate.model';
import { SurveyTemplateRepository } from 'src/app/model/surveyTemplate.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  public user: User;
  public surveyId: string;
  public survey: SurveyTemplate;

  constructor(
    private templateRepository: SurveyTemplateRepository,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.surveyId = this.route.snapshot.paramMap.get('id');
    this.survey = new SurveyTemplate();
    if(this.surveyId) {
      this.templateRepository.getSurveyTemplate(this.route.snapshot.paramMap.get('id')).subscribe(data => {
        this.survey = data;
        this.survey.questions.forEach(q => q.questionOptionObjs = q.questionOptions.map(o => new Option(o)));
      });
    }
  }

  addQuestion() {
    this.survey.questions = [...this.survey.questions, new Question()];
  }

  removeQuestion(qustion: Question) {
    this.survey.questions = this.survey.questions.filter(q => q._id !== qustion._id);
  }

  addOption(question: Question) {
    this.survey.questions.forEach(q => {
      if (q._id === question._id) q.questionOptionObjs = [...q.questionOptionObjs, new Option('')];
    });
  }

  removeOption(question: Question, option: Option) {
    this.survey.questions.forEach(q => {
      if (q._id === question._id) q.questionOptionObjs = q.questionOptionObjs.filter(o => o !== option);
    });
  }

  submitTemplate(form: NgForm): void {
    console.log("submitted");
    if (form.valid) {
      this.survey.userId = this.user.id;
      this.survey.questions.forEach(q => q.questionOptions = q.questionOptionObjs.map(o => o.text));
      if(this.surveyId) {
        this.survey.updated = new Date();
        this.templateRepository.editSurveyTemplate(this.survey).subscribe(() => this.router.navigateByUrl('/survey'));
      }
      else{
        this.survey.questions.forEach(q => q._id = undefined);
        this.templateRepository.addSurveyTemplate(this.survey).subscribe(() => this.router.navigateByUrl('/survey'));
      }
    }
  }
}
