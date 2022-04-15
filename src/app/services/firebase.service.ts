import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebaseAuth:AngularFireAuth) { }

  signin(email:string, password:string):any {
   return this.firebaseAuth.signInWithEmailAndPassword(email,password)
   .then(response => {
     return response
   })
  }
  signup(email:string, password:string):any {
    return this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(response => {
      return response
    })
  }
  logOut() {
    this.firebaseAuth.signOut()
  }
}
