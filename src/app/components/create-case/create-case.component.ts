import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Case } from '../../models/case.model';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CaseService } from '../../service/case.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css']
})
export class CreatecaseComponent implements OnInit {

  createcaseForm: FormGroup;
  errorMessage: string;
  case: Case;
  user;
  $event; // uploaded image
  picTab: Array<any> = []; // display
  picSend: (File | Blob)[] = []; // send to firebase
  imageUrl = [];
  message; // for the pic
  i = 0;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private caseS: CaseService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.initForm();
    //  this.compS.getCompany(localStorage.getItem('id')).subscribe(
    //  (data) => this.user = data
    // );

  }
  initForm() {
    this.createcaseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      taille: ['', [Validators.required]],
      mother: ['', Validators.required],
      father: ['', Validators.required],
      sexe: ['', Validators.required],
      age: ['', [Validators.required]],
      number: ['', [Validators.required]],
    });
  }
  upload(event) {
    this.picSend[this.i] = event.target.files[0];
    this.i++;
    const reader = new FileReader();
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.picTab.push(
        { image: reader.result }
      );
    };
  }
  onSubmit() {
    this.case = {
      name: this.createcaseForm.get('name').value,
      age: this.createcaseForm.get('age').value,
      release_date: Date.now(),
      enabled: true,
      taille: this.createcaseForm.get('taille').value,
      sexe: this.createcaseForm.get('sexe').value,
      address: this.createcaseForm.get('address').value,
      number: this.createcaseForm.get('number').value,
      idCase: '',
      father: this.createcaseForm.get('father').value,
      mother: this.createcaseForm.get('mother').value,
      description: this.createcaseForm.get('description').value,
      picture: ''
    };
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: 'auto',
      data: { name: this.case.name + ' ' + this.case.father }
    });

    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data === 'ok') {
          this.caseS.createcase(this.case, this.picSend);
          this.router.navigate(['/home']);
        }
      }
    );
  }

}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
