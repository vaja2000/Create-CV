import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educationForm!:FormGroup;
  eduQuantity_BADGE:any = null
  next:boolean = false

  constructor(
    private fBuilder:FormBuilder,
    private firebaseData:UserDataService
    ) {
    this.educationForm = this.fBuilder.group({
      edu:this.fBuilder.array([])
    })
   }
   ngOnInit(): void {
     
   }
   getEducation() {
     return this.educationForm.get('edu') as FormArray
   }
   newEducation() {
     return this.fBuilder.group({
       univercity_Collage: [ null, Validators.required ],
       faculty: [ null, Validators.required ],
       speciality: [ null, Validators.required ],
       startTime: [ null, Validators.required ],
       endTime: [ null, Validators.required ]
     })
   }
   
  //---------------view methods --------------- //
   addNewEducation() {
     this.getEducation().push(this.newEducation())
     this.eduQuantity_BADGE ++
   }
   deleteEducation(eduIndex:number) {
     this.getEducation().removeAt(eduIndex)
     this.eduQuantity_BADGE --
     if(this.eduQuantity_BADGE === 0)
        this.eduQuantity_BADGE = null
   }

   onSubmit() {
     this.next = true
     this.firebaseData.saveUserData(this.educationForm.value)
   }
}
