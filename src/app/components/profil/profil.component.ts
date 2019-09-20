import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../app/service/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../app/models/user.model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  isGuest = true;
  isUser = false;
  userData;
  userForm: FormGroup;
  passwordForm: FormGroup;
  actualPassword; // pour confirmer le changement de mail ou pw
  emailMessageError = null;
  passwordMessageError = null;

  constructor(private authS: AuthService, private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog) {
    if (localStorage.getItem('id')) {
      this.isGuest = false;
      this.isUser = true;
    }  else {
      this.isGuest = true;
      this.isUser = false;
      this.router.navigate(['/signUp']);
    }

  }
  getUser() {
    if (localStorage.getItem('id')) {
      this.authS.getUserDB(localStorage.getItem('id')).subscribe(
        (resp) => {
          this.userData = resp;
          this.userForm.get('username').setValue(this.userData.userName);
          this.userForm.get('email').setValue(this.userData.email);
          this.userForm.get('tel').setValue(this.userData.tel);

        }
      );
    }

  }
  openDialog(updateUser): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: 'auto',
      data: { email: updateUser.email, password: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actualPassword = result;
      this.authS.updateUserEmail(this.actualPassword).then(() => {
        const user = firebase.auth().currentUser;
        user.updateEmail(updateUser.email).then(() => {
          this.authS.updateUser(updateUser);
        }).catch((error) => {
          console.log('Une erreur s\' produite lors du changement de l\'addresse email');
        });
      }).catch((error) => { console.log('Mot de passe erroné'); });

    });
  }


  ngOnInit() {
    this.userForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.email],
        tel: ['', Validators.required],
      }
    );
    this.passwordForm = this.formBuilder.group(
      {
        actualPassword: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)])],
        newPassword: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)])],
        VnewPassword: ['', Validators.compose([Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)])]

      }
    );
    this.getUser();

  }

  updateUser() {
    const UpdatedUser: User = {
      userName: this.userForm.get('username').value,
      tel: this.userForm.get('tel').value,
      email: this.userForm.get('email').value,
      id: this.userData.id,
      enabled: true,
      updated: new Date(),
      created: this.userData.created,
    };
    if (this.userData.email !== UpdatedUser.email) {
      this.openDialog(UpdatedUser);
    } else {
      this.authS.updateUser(UpdatedUser);
    }

  }
  updatePassword() {
    const passwordUpdate = {
      actualPassword: this.passwordForm.get('actualPassword').value,
      newPassword: this.passwordForm.get('newPassword').value,
      VnewPassword: this.passwordForm.get('VnewPassword').value
    };
    this.authS.updateUserPassword(passwordUpdate.actualPassword).then(() => {
      if (passwordUpdate.newPassword === passwordUpdate.VnewPassword) {
        const user = firebase.auth().currentUser;
        user.updatePassword(passwordUpdate.newPassword).then(() => {
          console.log('Password mis à jour!');
          this.passwordForm.reset();
        }).catch((error) => { console.log('erreur lors de la mis à jour du mot de passe'); });
      } else {
        console.log('mot de passe non conforme');
      }
    }
    ).catch((error) => {
      console.log('mauvais mot de passe');
    });
  }

}

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
