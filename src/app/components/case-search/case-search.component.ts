import { Component, OnInit } from '@angular/core';
import { Case } from '../../models/case.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseService } from '../../service/case.service';

@Component({
  selector: 'app-case-search',
  templateUrl: './case-search.component.html',
  styleUrls: ['./case-search.component.css']
})
export class CaseSearchComponent implements OnInit {
  keyword; // job's keyword
  cases: Case[] = [];
  result = false;
  temp;

  constructor(private aR: ActivatedRoute, private route: Router, private caseS: CaseService) {
    this.keyword = this.aR.snapshot.params['keyword'];
    console.log(this.keyword);
    if (this.keyword) {
      this.caseS.searchcaseN(this.keyword).subscribe(
        (data) => {
          this.cases = this.cases.concat(data); if (this.cases.length > 0) {
            this.result = true;
          } else {
            this.result = false;
          }
        }
      );
      this.caseS.searchcaseM(this.keyword).subscribe(
        (data) => {
          this.cases = this.cases.concat(data); if (this.cases.length > 0) {
            this.result = true;
          } else {
            this.result = false;
          }
        }
      );
      this.caseS.searchcaseP(this.keyword).subscribe(
        (data) => {
          this.cases = this.cases.concat(data); if (this.cases.length > 0) {
            this.result = true;
          } else {
            this.result = false;
          }
        }
      );
    } else {
      this.route.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
  }
  details(item) {
    this.route.navigate(['/caseDetails/', item.idCase]);
  }
  rechercher() {
    if (this.keyword) {
      this.cases = [];
      this.result = false;
      this.caseS.searchcaseN(this.keyword).subscribe(
        (data) => {
          this.cases = this.cases.concat(data); if (this.cases.length > 0) {
            this.result = true;
          } else {
            this.result = false;
          }
        }
      );
      this.caseS.searchcaseM(this.keyword).subscribe(
        (data) => {
          this.cases = this.cases.concat(data); if (this.cases.length > 0) {
            this.result = true;
          } else {
            this.result = false;
          }
        }
      );
      this.caseS.searchcaseP(this.keyword).subscribe(
        (data) => {
          this.cases = this.cases.concat(data); if (this.cases.length > 0) {
            this.result = true;
          } else {
            this.result = false;
          }
        }
      );
    }
  }
}

