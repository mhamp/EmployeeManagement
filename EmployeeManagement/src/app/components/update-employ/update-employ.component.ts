import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EmployService } from './../../shared/employ.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-update-employ',
  templateUrl: './update-employ.component.html',
  styleUrls: ['./update-employ.component.css']
})
export class UpdateEmployComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  isPermanent = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  editEmployForm: FormGroup;

  ngOnInit() {
    this.updateEmployForm();
  }

  constructor(
    public fb: FormBuilder,    
    private location: Location,
    private employApi: EmployService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.employApi.getEmploy(id).valueChanges().subscribe(data => {
      this.editEmployForm.setValue(data);
    })
  }

  /* Update form */
  updateEmployForm(){
    this.editEmployForm = this.fb.group({
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

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editEmployForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editEmployForm.get('hireDate').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Go to previous page */
  goBack(){
    this.location.back();
  }

  /* Submit employ */
  updateEmploy() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
        this.employApi.updateEmploy(id, this.editEmployForm.value);
      this.router.navigate(['employs-list']);
    }
  }

}