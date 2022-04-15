import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  user!:any[]
  driverLicense_CATEGORY:any[] = []
  spinner:boolean = false
  userId:any

  constructor(
    private firebaseData:UserDataService,
    private firebaseAuth:FirebaseService,
    private router:Router,
    private route:ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')
    this.firebaseData.getUserData().subscribe((resp:any) => {
      resp.forEach((element:any) => {
        if(element.user === this.userId)
        this.user = element.userData
      });
      for(let category in this.user[5]){
        if(this.user[5][category] === true)
        this.driverLicense_CATEGORY.push(category)
      }
      this.spinner = true
    })
  }
  logout() {
    this.firebaseAuth.logOut()
    this.router.navigate(['login'])
  }
}
