import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      npassword: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });
  }

  onSubmit() {
    const npassword = this.signUpForm.get('npassword').value;
    const password = this.signUpForm.get('password').value;
    const email = this.signUpForm.get('email').value;

    if (password === npassword) {
      this.authService.createNewUser(email, password).then(
        () => {
          this.router.navigate(['/home']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );
    } else {
      console.log('veuillez retaper le mdp');
    }

  }
}
