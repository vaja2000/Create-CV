import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import { MyErrorStateMatcher } from './error-state-matcher';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  next:boolean = false
  personalData:FormGroup = new FormGroup ({})
  matcher = new MyErrorStateMatcher();
  emailFormControl:any
  user_IMG:string = 'https://www.psdgraphics.com/file/user-icon.jpg'
  cities_Municipalities:any[] = [
    {
      name: 'ქალაქები',
      list: [
        'თბილისი',
        'ქუთაისი',
        'რუსთავი',
        'ბათუმი',
        'ფოთი'
      ]
    },
    {
      name: 'რაიონები',
      list: [
        'აბაშის რაიონი',
        'ადიგენის რაიონი',
        'თიღვის რაიონი',
        'ამბროლაურის რაიონი',
        'აჟარის რაიონი',
        'ასპინძის რაიონი',
        'ახლაგორის რაიონი',
        'ახალქალაქის რაიონი',
        'ახალციხის რაიონი',
        'ახმეტის რაიონი',
        'ხელვაჩაურის რაიონი',
        'ბაღდათის რაიონი',
        'ბოლნისის რაიონი',
        'ბორჯომის რაიონი',
        'გარდაბნის რაიონი',
        'გორის რაიონი',
        'გურჯაანის რაიონი',
        'დედოფლისწყაროს რაიონი',
        'დმანისის რაიონი',
        'დუსეთის რაიონი',
        'ერედვის რაიონი',
        'ვანის რაიონი',
        'ზესტაფონის რაიონი',
        'ზუგდიდის რაიონი',
        'თეთრიწყაროს რაიონი',
        'თელავის რაიონი',
        'თერჯოლის რაიონი',
        'თიანეთის რაიონი',
        'კასპის რაიონი',
        'ლაგოდეხის რაიონი',
        'ლანჩხუთის რაიონი',
        'ლენტეხის რაიონი',
        'მარნეულის რაიონი',
        'მარტვილის რაიონი',
        'მესტიის რაიონი',
        'მცხეთის რაიონი',
        'ნინოწმინდის რაიონი',
        'ოზურგეთის რაიონი',
        'ონის რაიონი',
        'საგარეჯოს რაიონი',
        'სამტრედიის რაიონი',
        'საჩხერის რაიონი',
        'სენაკის რაიონი',
        'სიღნაღის რაიონი',
        'ყაზბეგის რაიონი',
        'ტყიბულის რაიონი',
        'ქარელის რაიონი',
        'ქედის რაიონი',
        'ქობულეთის რაიონი',
        'ქურთის რაიონი',
        'ყვარლის რაიონი',
        'შუახევის რაიონი',
        'ჩოხატაურის რაიონი',
        'ჩოროწყუს რაიონი',
        'ცაგერის რაიონი',
        'წალენკიხის რაიონი',
        'წალკის რაიონი',
        'წყალტუბოს რაიონი',
        'ჭიათურის რაიონი',
        'ხარაგაულის რაიონი',
        'ხაშურის რაიონი',
        'ხობის რაიონი',
        'ხონის რაიონი',
        'ხულოს რაიონი'
      ]
    }
  ]
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


  constructor(private firebaseData:UserDataService) { }

  ngOnInit(): void {
    this.personalData = new FormGroup({
      'firstName': new FormControl(null, [ Validators.required, Validators.minLength(2) ]),
      'lastName': new FormControl(null, [ Validators.required, Validators.minLength(4) ]),
      'contacts': new FormGroup({
        'email': new FormControl(null, [ Validators.required, Validators.email ]),
        'phone': new FormControl(null, [ Validators.required ])
      }),
      'address': new FormGroup({
        'city_municipality': new FormControl(null, [ Validators.required ]),
        'specific_address': new FormControl(null, [ Validators.required ])
      }),
      'dateOfBirth': new FormGroup({
        'day': new FormControl(null, [ Validators.required ]),
        'month': new FormControl(null, [ Validators.required ]),
        'year': new FormControl(null, [ Validators.required ])
      }),
      'photo': new FormControl(null, [ Validators.required ])
    })
    this.emailFormControl = this.personalData.get('contacts')?.get('email')
  }
  onSubmit() {
    this.personalData.value.photo = this.user_IMG
    this.firebaseData.saveUserData(this.personalData.value)
    this.next = true
  }
  onUploadPhoto(e:any) {
    if(e.target.files) {
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = (event:any) => {
        this.user_IMG = event.target.result
      }
    }
  }
}
