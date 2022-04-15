import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { MyErrorStateMatcher } from './error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  personalData:FormGroup = new FormGroup ({})
  matcher = new MyErrorStateMatcher();
  login!:FormGroup
  emailFormControl:any
  hide = true;
  authorization:boolean = true
  title:string = 'შესვლა'
  isSignedIn:boolean = true

  constructor(
    private firebase:FirebaseService,
    private firebaseData:UserDataService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.login = new FormGroup ({
      'email': new FormControl(null, [ Validators.required, Validators.email ]),
      'password': new FormControl(null, [ Validators.required, Validators.minLength(6) ])
    })

    this.emailFormControl = this.login.get('email')
  }
  // user registracion function
  newUser!:boolean
  onSignup() {
    this.firebase.signup(this.login.value.email, this.login.value.password)
    .catch((error:any) => {
      this.newUser = false
    }).then((resp:any) => {
      this.firebaseData.saveUserId(resp.user?.uid)
      this.newUser = resp.additionalUserInfo.isNewUser
      if(this.newUser == true)
        this.router.navigate(['personal-data'])
    })
    this.login.reset()
  }
  // login function
  user!:boolean
  onSignin() {
    this.firebase.signin(this.login.value.email, this.login.value.password)
    .catch((error:any) => {
      this.user = true
    }).then((resp:any) => {
      if(resp.additionalUserInfo.isNewUser == false)
        this.router.navigate(['user-data', resp.user?.uid])
    })
    this.login.reset()
  }
  // Go to the registration form
  signup() {
    this.login.reset()
    this.authorization = false
    this.title = 'რეგისტრაცია'
  }
  // sign out function
  back() {
    this.authorization = true
  }
}
