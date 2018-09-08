import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid";
import { Work } from '../model/work';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {

  private gridOptions: GridOptions;
  private works : Work[];
  private workId : any;
  private hideBtn : string;
  constructor(private orderService : OrderService) {
    this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs = [
            {
                headerName: "Order ID",
                field: "id",
                width: 100
            },
            {
                headerName: "Name",
                field: "name",
                width: 150
            },
            {
              headerName: "Mobile",
              field: "mobile",
              width: 150
            },
            {
              headerName: "Type Of Work",
              field: "work",
              width: 150
            },
            {
              headerName: "No. Of Cards",
              field: "cardno",
              width: 120
            },
            {
              headerName: "Amount to Collect",
              field: "amount",
              width: 150
            },
            {
              headerName: "Delivery Date",
              field: "date",
              width: 130
            }

        ];
        this.gridOptions.rowData = [
            {id: 1, name: "Aryan", mobile: "9966296262", work: "Wedding Cards", cardno : 500, amount: 2000, date:"14-Jan-2018"},
            {id: 2, name: "Chinnu", mobile: "8886296262", work: "Visiting Cards", cardno : 1000, amount: 500, date:"14-Jan-2018"}
        ]
   }

  ngOnInit() {
    this.orderService.getAllTypeOfWorks()
        .subscribe( data => {
         this.works = data;
         this.workId = 1;
         this.hideBtn = "Add Work";
         console.log(this.works);
        });
  }

  onClickHideBtn(){
    if(this.hideBtn == 'Add Work'){
      this.hideBtn = 'Hide Work';
    }else{
      this.hideBtn = 'Add Work';
    }
  }

  onClickSave(){
    alert('This saves the record');
  }
}
