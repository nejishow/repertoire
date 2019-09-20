import { Component, OnInit } from '@angular/core';
import { CaseService } from '../../service/case.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Case } from 'src/app/models/case.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  cases: Observable<Case[]>;
  result = false;
  image;
  imageUrls: any = [];
  constructor(private caseS: CaseService, private route: Router, private aR: ActivatedRoute) {
    this.caseS.getcases();
    this.cases = this.caseS.cases;
  }

  ngOnInit() {
    //
  }
  details(item) {
    this.route.navigate(['/caseDetails/', item.idCase]);
  }

}
