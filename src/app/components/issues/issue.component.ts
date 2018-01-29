import { Component, OnInit } from '@angular/core';
import { Issue } from '../../models/issue'

import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-logs',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  issues: Issue[];
  selectedIssue: Issue;
  loaded: boolean = false;

  constructor(private issueService: IssueService) { }

  ngOnInit() {

    this.issueService.stateClear.subscribe(clear => {
      if(clear) {
        this.selectedIssue = {id: '', text : '', date: ''}
      }
    })

    this.issueService.getIssues().subscribe(issues => {
      this.issues = issues;
      this.loaded = true;      
    });
  }

  onSelect(issue: Issue) {
    this.issueService.setFormIssue(issue);
    this.selectedIssue = issue;
  }
  onDelete(issue: Issue) {
    if(confirm("Are You Sure?")) {
      this.issueService.deleteIssue(issue);
    }
  }
}