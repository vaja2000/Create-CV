import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements OnInit {
  jobs!:FormGroup
  jobQuantity_BADGE:any = null
  next:boolean = false
  date:any = {
    day:[
      1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,
      17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
    ],
    month:[
      "იანვარი","თებერვალი","მარტი","აპრილი",
      "მაისი","ივნისი","ივლისი","აგვისტო",
      "სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი"
    ]
  }

  constructor( 
    private fBuilder:FormBuilder,
    private firebaseData:UserDataService
    ) { 
    this.jobs = fBuilder.group({
      job:this.fBuilder.array([])
    })
  }

  ngOnInit(): void {
    
  }
  getJob() {
    return this.jobs.get('job') as FormArray
  }
  newJob() {
    return this.fBuilder.group({
      company: [ null, Validators.required ],
      position: [ null, Validators.required ],
      shortDescription: [ null, Validators.required ],
      startDay: [ null, Validators.required ],
      startMonth: [ null, Validators.required ],
      startYear: [ null, Validators.required ],
      endDay: [ null ],
      endMonth: [ null ],
      endYear: [ null ],
      achievements: this.fBuilder.array([])
    })
  }
  getAchivements(jobIndex:number) {
    return this.getJob().at(jobIndex).get('achievements') as FormArray
  }
  newAchivements():FormGroup {
    return this.fBuilder.group({
      Position: [ null, Validators.required ],
      startDay: [ null, Validators.required ],
      startMonth: [ null, Validators.required ],
      startYear: [ null, Validators.required ],
      endDay: [ null ],
      endMonth: [ null ],
      endYear: [ null ]
    })
  }

  // -------------- view methosds -------------- //
  addNewJob() {
    this.getJob().push(this.newJob())
    this.jobQuantity_BADGE ++
  }
  deleteJob(jobIndex:number) {
    this.getJob().removeAt(jobIndex)
    this.jobQuantity_BADGE --
    if(this.jobQuantity_BADGE === 0)
       this.jobQuantity_BADGE = null
  }
  addNewAchivement(jobIndex:number) {
    this.getAchivements(jobIndex).push(this.newAchivements())
  }
  deleteAchivement(jobIndex:number, achivementIndex:number) {
    this.getAchivements(jobIndex).removeAt(achivementIndex)
  }
  onSubmit() {
    this.firebaseData.saveUserData(this.jobs.value)
    this.next = true
  }
}
