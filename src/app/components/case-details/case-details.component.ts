import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CaseService } from '../../service/case.service';
import { Case } from '../../models/case.model';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.css']
})
export class CaseDetailsComponent implements OnInit {
  id; // case's id
  case: Case;
  picTab = [];
  height = '400px';
  minHeight: string;
  arrowSize = '30px';
  showArrows = true;
  disableSwiping = false;
  autoPlay = true;
  autoPlayInterval = 3333;
  stopAutoPlayOnSlide = true;
  debug = false;
  backgroundSize = 'contain';
  backgroundPosition = 'center center';
  backgroundRepeat = 'no-repeat';
  showDots = true;
  dotColor = '#FFF';
  showCaptions = true;
  captionColor = '#FFF';
  captionBackground = 'rgba(0, 0, 0, .35)';
  lazyLoad = false;
  hideOnNoSlides = false;
  width = 'auto';
  url;
  constructor(private aR: ActivatedRoute, private route: Router, private jobS: CaseService) {
    this.url = this.route.url;
    this.id = this.aR.snapshot.params['id'];
    this.jobS.getcase(this.id).subscribe(
      data => {
        this.case = data;
        for (let index = 0; index < this.case.picture.length; index++) {
          this.picTab.push(
            {
              url: this.case.picture[index].url,
              caption: this.case.name + ' ' + this.case.father,
              backgroundSize: 'contain',
              backgroundPosition: 'center'
            });
        }
        console.log(this.picTab);
      }
      ,
      err => err);
  }
  onSlideRight() {
  //
  }

  ngOnInit() {
  }

}
