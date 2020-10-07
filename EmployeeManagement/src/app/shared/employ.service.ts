import { Injectable } from '@angular/core';
import { Employ } from './employ';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class EmployService {

  employList: AngularFireList<any>;
  employRef: AngularFireObject<any>;

  constructor( private db: AngularFireDatabase ) {}


  addEmploy(employ: Employ){
    this.employList.push({
      fullName: employ.fullName,
      email: employ.email,
      mobile: employ.mobile,
      city: employ.city,
      gender: employ.gender,
      department: employ.department,
      hireDate: employ.hireDate,
      isPermanent: employ.isPermanent
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  updateEmploy($key, employ: Employ) {
    this.employRef.update({
      fullName: employ.fullName,
      email: employ.email,
      mobile: employ.mobile,
      city: employ.city,
      gender: employ.gender,
      department: employ.department,
      hireDate: employ.hireDate,
      isPermanent: employ.isPermanent
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  deleteEmploy($key: string) {
    this.employRef = this.db.object('employ-list/' + $key);
    this.employRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  getEmploy($key: string) {
    this.employRef = this.db.object('employ-list/' + $key);
    return this.employRef;
  }  

  getEmployList() {
    this.employList = this.db.list('employ-list');
    return this.employList;
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }  
}  
