import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Issue } from '../models/issue';



@Injectable()
export class IssueService {
  issues: Issue[];

  private issueSource = new BehaviorSubject<Issue>({id: null, text: null, date: null});
  seelctedIssue = this.issueSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.issues = [];
   }

   getIssues(): Observable<Issue[]> {

    if(localStorage.getItem('issues') === null ) {
      this.issues = [];
    } else {
      this.issues = JSON.parse(localStorage.getItem('issues'));
    }

     return of(this.issues.sort((a,b) => {
       return b.date - a.date;
     }));
   }

   setFormIssue(issue: Issue ) {
     this.issueSource.next(issue);
   }

   addIssue(issue: Issue) {
     this.issues.unshift(issue);

     //Persist in local storage
    localStorage.setItem('issues,', JSON.stringify(this.issues));

   }

   updateIssue(issue: Issue) {
     this.issues.forEach((current, index) => {
        if ( issue.id === current.id) {
          this.issues.splice(index,1);
        }
     });
     this.issues.unshift(issue);

     localStorage.setItem('issues,', JSON.stringify(this.issues));
   }

   deleteIssue(issue: Issue) {
    this.issues.forEach((current, index) => {
       if ( issue.id === current.id) {
         this.issues.splice(index,1);
       }
    });

    localStorage.setItem('issues,', JSON.stringify(this.issues));
  }

  clearState() {
    this.stateSource.next(true);
  }


}
