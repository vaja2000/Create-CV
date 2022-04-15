import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-comp-programs',
  templateUrl: './comp-programs.component.html',
  styleUrls: ['./comp-programs.component.scss']
})
export class CompProgramsComponent implements OnInit {
  programQuantity_BADGE:any = null
  programs!:FormGroup
  next:boolean = false
  levels:string[] = [
    "A1-საშუალო",
    "A2-ელემენტარული",
    "B1-საშუალო",
    "B2-მაღალი საშუალო",
    "C1-მაღალი",
    "C2-პროფესიონალი",
  ];

  constructor(
    private fBuilder:FormBuilder,
    private firebaseData:UserDataService
    ) { 
    this.programs = fBuilder.group({
      prog:fBuilder.array([])
    })
  }
  getProgram() {
    return this.programs.get('prog') as FormArray
  }
  newProgram() {
    return this.fBuilder.group({
      program: [ null, Validators.required ],
      level: [ null, Validators.required ]
    })
  }

  ngOnInit(): void {
  }

  // -------------view methods-------------- //
  addNewProgram() {
    this.getProgram().push(this.newProgram())
    this.programQuantity_BADGE ++
  }
  deleteProgram(progIndex:number) {
    this.getProgram().removeAt(progIndex)
    this.programQuantity_BADGE --
    if(this.programQuantity_BADGE === 0)
       this.programQuantity_BADGE = null
  }
  onSubmit() {
    this.firebaseData.saveUserData(this.programs.value)
    this.next = true
  }
}
