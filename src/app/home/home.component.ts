import { Component, OnInit, ViewChild } from '@angular/core';
import { CaseService } from '../service/case.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  @ViewChild('slideshow') slideshow: any;
  keyword;
  cases;
  slide = [];
  imageUrls = [];
  interval;
  i = 0;
  in = 0;
  data;
  public startingTab = [
    { url: '../../assets/where1.jpg' },
    { url: '../../assets/where2.jpg' },
    { url: '../../assets/where3.jpg' },
    { url: '../../assets/where4.jpeg' },
    { url: '../../assets/where5.jpeg' },
  ];
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
  constructor(private router: Router, private caseS: CaseService) {
    this.caseS.getcases();
    this.cases = this.caseS.cases;
    this.cases.forEach((cas) => {
      if (cas.length > 0 && cas.length !== null) {
        cas.forEach((_cas) => {
          this.caseS.getImages(_cas.idCase).subscribe((url) => {
            for (let index = 0; index < url.length; index++) {
              if (url[index].picture.length > 0 || url[index].picture.length !== null) {
                for (let i = 0; i < url[index].picture.length; i++) {
                  this.slide.push(
                    {
                      url: url[index].picture[i].url,
                      caption: _cas.name + ' ' + _cas.father,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center'
                    });

                }
              }
            }
          });
        });
      } else {
        this.imageUrls = this.startingTab;
      }
    });
    setTimeout(() => {
      this.imageUrls = this.slide;
    }, 3000);
  }
  OnInit() {
    //
  }
  rechercher() {
    if (this.keyword) {
      this.router.navigate(['/caseSearch/', this.keyword]);

    }
  }
  onSlideRight() {
    //
  }

}
