import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IssueFormComponent } from './components/issue-form/issue-form.component';
import { IssueComponent } from './components/issues/issue.component';
import { IssueService } from './services/issue.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IssueFormComponent,
    IssueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
