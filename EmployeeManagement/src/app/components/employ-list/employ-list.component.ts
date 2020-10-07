import { Employ } from './../../shared/employ';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from'@angular/material/paginator';
import { EmployService } from './../../shared/employ.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employ-list',
  templateUrl: './employ-list.component.html',
  styleUrls: ['./employ-list.component.css']
})

export class EmployListComponent {
  
  dataSource: MatTableDataSource<Employ>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  EmployData: any = [];
  displayedColumns: any[] = [
    '$key',
    'fullName',
    'email', 
    'city',
    /*'hireDate'*/
    'action'
  ];
  
  constructor(private employApi: EmployService){
    this.employApi.getEmployList()
    .snapshotChanges().subscribe(employee => {
        employee.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.EmployData.push(a as Employ)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.EmployData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
        this.dataSource.sort = this.sort;
    })
  }

  /* Delete */
  deleteEmploy(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.employApi.deleteEmploy(e.$key)
    }
  }
}