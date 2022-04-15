import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  userAllData:any = {
    user: "",
    userData: []
  }

  constructor(private firebaseData:AngularFirestore) { }

  saveUserId(user:any) {
    this.userAllData.user = user
  }
  saveUserData(data:any) {
    this.userAllData.userData.push(data)
  }
  addUserDataInFirestore() {
    this.firebaseData.collection(environment.firebaseCollect.user)
    .add(this.userAllData)
  }
  getUserData() {
    return this.firebaseData.collection(environment.firebaseCollect.user)
    .valueChanges()
  }
}
