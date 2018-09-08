import { Component, OnInit } from '@angular/core';
import {GridOptions} from "ag-grid";
import { Work } from '../model/work';
import { OrderService } from '../services/order.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent implements OnInit {

  private gridOptions: GridOptions;
  private works : Work[];
  private workId : any;
  private model : any;
  private noOfCardsDisabled : boolean = false;
  private noOfCards : number;
  private flag : boolean = false;
  private customerName : string;
  private mobile : number;
  private totalAmount : number;
  private amountPaid : number;
  private deliveryDate : string;
  private selTime : string;
  private balanceAmount : number;
  private order : Order = {};

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
         this.selTime = "mor";
         for(let work of this.works){
            if(work.workName == 'Wedding Cards'){
              this.workId = work.id;
            }
         }
         console.log(this.works);
        });
  }

  calculateBalance(){
    if((this.totalAmount != undefined || this.totalAmount != null) && (this.amountPaid != undefined || this.amountPaid != null) ){
      this.balanceAmount = this.totalAmount - this.amountPaid;
      if(this.balanceAmount < 0){
        this.balanceAmount = 0;
      }
    }else{
      this.balanceAmount = 0;
    }
  }
  onClickSave(){
    
    this.order.work = this.workId;
    this.order.no_of_cards = this.noOfCards;
    this.order.name = this.customerName;
    this.order.mobile = this.mobile;
    this.order.total_amount = this.totalAmount;
    this.order.amount_collected = this.amountPaid;
    this.order.delivery_date = this.deliveryDate;
    this.order.time = this.selTime;
    this.orderService.saveOrder(this.order);

    this.orderService.saveOrder(this.order)
        .subscribe( error => {
         console.log("Error:", error);
        });
  }

  onChangeWork(){
    for(let work of this.works){
      if(this.workId == work.id && (work.workName == 'Wedding Cards'|| work.workName == 'Visiting Cards')){
        this.noOfCardsDisabled = false;
      }else if(this.workId == work.id){
        this.noOfCardsDisabled = true;
      }
    }
  }
}
