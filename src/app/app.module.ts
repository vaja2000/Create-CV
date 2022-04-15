import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

// material api
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { PersonalDataComponent } from './views/personal-data/personal-data.component';
import { WorkExperienceComponent } from './views/work-experience/work-experience.component';
import { LanguageComponent } from './views/language/language.component';
import { CompProgramsComponent } from './views/comp-programs/comp-programs.component';
import { EducationComponent } from './views/education/education.component';
import { CarLicenseComponent } from './views/car-license/car-license.component';
import { UserDataComponent } from './views/user-data/user-data.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './views/login/login.component';
import { FirebaseService } from './services/firebase.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonalDataComponent,
    EducationComponent,
    WorkExperienceComponent,
    LanguageComponent,
    CompProgramsComponent,
    CarLicenseComponent,
    UserDataComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // material api
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
