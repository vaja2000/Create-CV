import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-car-license',
  templateUrl: './car-license.component.html',
  styleUrls: ['./car-license.component.scss']
})
export class CarLicenseComponent implements OnInit {
  license!:FormGroup
  next:boolean = false
  categories:any[] = [
    "AM","A","B","C","D","BE","CE","DE","T","S",
    "A1","A2","B1","C1","D1","C1E","D1E"
  ];

  constructor(
    private fBuilder:FormBuilder,
    private firebaseData:UserDataService
    ) {
    this.license = fBuilder.group({
      AM:false,
      A:false,
      B:false,
      C:false,
      D:false,
      BE:false,
      CE:false,
      DE:false,
      T:false,
      S:false,
      A1:false,
      A2:false,
      B1:false,
      C1:false,
      D1:false,
      C1E:false,
      D1E:false
    })
   }

  ngOnInit(): void {
  }
  onSubmit() {
    this.firebaseData.saveUserData(this.license.value)
    this.firebaseData.addUserDataInFirestore()
    this.next = true
  }
}
