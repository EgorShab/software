import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from './model/model.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyModule } from './survey/survey.module';
import { PagesModule } from './pages/pages.module';
import { JwtModule } from '@auth0/angular-jwt';

export function jwtTokenGetter(): string {
  return localStorage.getItem('id_token');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ModelModule,
    BrowserModule,
    AppRoutingModule,
    SurveyModule,
    PagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
