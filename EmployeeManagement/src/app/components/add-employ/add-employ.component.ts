import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipsModule } from '@angular/material/chips';
import { EmployService } from './../../shared/employ.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { AngularFireDatabase} from 'angularfire2/database';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-employ',
  templateUrl: './add-employ.component.html',
  styleUrls: ['./add-employ.component.css']
})
export class AddEmployComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  employForm: FormGroup;
  @ViewChild('chipList') chipList;
  @ViewChild('resetEmployForm') myNgForm;
  isPermanent = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
    this.employApi.getEmployList();
    this.submitEmployForm();
  }
  
  constructor(
    public fb: FormBuilder,
    private employApi: EmployService,
    private router: Router
  ) { }



  submitEmployForm() {
    this.employForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      city: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      department: [''],
      hireDate: ['', [Validators.required]],
      isPermanent: ['']  
    })
  }

  /* Submit employ */
  submitEmploy() {
    if (this.employForm.valid ){
      this.employApi.addEmploy(this.employForm.value)
      this.resetForm();
      this.router.navigate(['/employ-list']);
    } else {
      console.log('Submission failure: Invalid input')
    }
  }

   /* Get errors */
   public handleError = (controlName: string, errorName: string) => {
    return this.employForm.controls[controlName].hasError(errorName);
  }

   /* Date */
   formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.employForm.get('hireDate').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Reset form */
  resetForm() {
    this.employForm.reset();
    Object.keys(this.employForm.controls).forEach(key => {
      this.employForm.controls[key].setErrors(null)
    });
  }


}
