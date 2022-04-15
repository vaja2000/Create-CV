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
      startTime: [ null, Validators.required ],
      endTime: '',
      achievements: this.fBuilder.array([])
    })
  }
  getAchivements(jobIndex:number) {
    return this.getJob().at(jobIndex).get('achievements') as FormArray
  }
  newAchivements():FormGroup {
    return this.fBuilder.group({
      Position: [ null, Validators.required ],
      start: [ null, Validators.required ],
      end: ''
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
