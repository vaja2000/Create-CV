import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  languages!:FormGroup
  langQuantity_BADGE:any = null
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
    this.languages = fBuilder.group({
      lang:fBuilder.array([])
    })
  }
  getLanguage() {
    return this.languages.get('lang') as FormArray
  }
  newLanguage() {
    return this.fBuilder.group({
      language: [ null, Validators.required],
      level: [ null, Validators.required ]
    })
  }
  ngOnInit(): void {
  }

  // ----------view method-----------//
  addNewLanguage() {
    this.getLanguage().push(this.newLanguage())
    this.langQuantity_BADGE ++
  }
  deleteLanguage(langIndex:number) {
    this.getLanguage().removeAt(langIndex)
    this.langQuantity_BADGE --
    if(this.langQuantity_BADGE === 0)
       this.langQuantity_BADGE = null
  }
  onSubmit() {
    this.firebaseData.saveUserData(this.languages.value)
    this.next = true
  }
}
