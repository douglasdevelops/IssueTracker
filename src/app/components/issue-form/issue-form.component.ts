import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';

import { Issue } from '../../models/issue'
@Component({
  selector: 'app-log-form',
  templateUrl: './issue-form.component.html',
  styleUrls: []
})
export class IssueFormComponent implements OnInit {

  id: string;
  text: string;
  date: any;

  isNew: boolean = true;

  constructor(private issueservice: IssueService) { }

  ngOnInit() {
    this.issueservice.seelctedIssue.subscribe(issue => {
      if (issue.id !== null) {
        this.id = issue.id;
        this.text = issue.text;
        this.date = issue.date;

        this.isNew = false;

      }
    });
  }

  onSubmit() {
    if (this.isNew) {
      //add new issue
      const newIssue = {
        id: this.GenerateID(),
        text: this.text,
        date: new Date()
      }
      this.issueservice.addIssue(newIssue);
    } else {
      //update new issue
      const issueToUpdate = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      this.issueservice.updateIssue(issueToUpdate);
    }

    this.clearState();
  }

  GenerateID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  clearState() {
    this.isNew = true;

    this.id = '';
    this.text = '';
    this.date = '';

    this.issueservice.clearState();

  }
}
