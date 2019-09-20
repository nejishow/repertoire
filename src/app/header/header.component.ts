import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('toolbar') matToolbar: any;
  isGuest = true;
  isUser = false; constructor(private authS: AuthService, private router: Router) {
    //
    authS.AuthenticationCheck();
    if (localStorage.getItem('id')) {
      this.isGuest = false;
      this.isUser = true;
    } else {
      this.isGuest = true;
      this.isUser = false;
    }
    authS.guest.subscribe(
      (data) => this.isGuest = data
    );
    authS.user.subscribe(
      (data) => this.isUser = data
    );
  }
  signOut() {
    this.authS.signOutUser();
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    //
  }

}
