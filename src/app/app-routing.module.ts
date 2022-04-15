import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarLicenseComponent } from './views/car-license/car-license.component';
import { CompProgramsComponent } from './views/comp-programs/comp-programs.component';
import { EducationComponent } from './views/education/education.component';
import { HomeComponent } from './views/home/home.component';
import { LanguageComponent } from './views/language/language.component';
import { LoginComponent } from './views/login/login.component';
import { PersonalDataComponent } from './views/personal-data/personal-data.component';
import { UserDataComponent } from './views/user-data/user-data.component';
import { WorkExperienceComponent } from './views/work-experience/work-experience.component';


const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'login', component:LoginComponent },
  { path: 'personal-data', component:PersonalDataComponent },
  { path: 'education', component:EducationComponent },
  { path: 'work-experience', component:WorkExperienceComponent },
  { path: 'language', component:LanguageComponent },
  { path: 'programs', component:CompProgramsComponent },
  { path: 'license', component:CarLicenseComponent },
  { path: 'user-data/:id', component:UserDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
