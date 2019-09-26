import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/log-in/log-in.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfilComponent, Dialog } from './components/profil/profil.component';
import { UserGuardService } from './service/user-guard.service';
import { CaseDetailsComponent } from './components/case-details/case-details.component';
import { CasesComponent } from './components/cases/cases.component';
import { CaseSearchComponent } from './components/case-search/case-search.component';
import { CreatecaseComponent, DialogOverviewExampleDialog } from './components/create-case/create-case.component';

const routes: Routes = [
    {  path: 'login', component: LoginComponent},
    {  path: 'signUp', component: SignUpComponent},

    {  path: 'createCase', canActivate: [UserGuardService], component: CreatecaseComponent },
    {  path: 'caseDetails/:id', component: CaseDetailsComponent},
    {  path: 'caseSearch/:keyword', component: CaseSearchComponent},
    {  path: 'cases', component: CasesComponent},
    {  path: 'profil', component: ProfilComponent},


    {  path: '', component: HomeComponent},
    {  path: '**', component: HomeComponent}

];
export const components = [
  HomeComponent, LoginComponent, HeaderComponent, FooterComponent,
   CreatecaseComponent, SignUpComponent, CaseDetailsComponent,
    CasesComponent, DialogOverviewExampleDialog,
    ProfilComponent, Dialog, CaseSearchComponent
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
