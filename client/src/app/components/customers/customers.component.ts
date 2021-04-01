import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ListService } from 'src/app/services/list.service';
import * as moment from 'moment';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers;
  filteredCustomers;
  companyCodeDetails;
  filter: FormControl = new FormControl('');

  @ViewChild('accordion') accordion: MatAccordion;

  constructor(public dictionaryService: DictionaryService, public errorMessageService: ErrorMessageService,
    private customerService: CustomerService, public listService: ListService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchCustomers();
    this.initCustomerSearch();
  }

  async fetchCustomers() {
    try {
      const email = this.authService.account.email;
      this.customers = await this.customerService.getCustomers(email).toPromise();
      this.customers.forEach(customer => {
        let datetime = moment(customer.datetime);
        if (datetime.isSame(new Date(), "day")){
          customer.datetime = moment(customer.datetime).fromNow();
        } else {
          customer.datetime = moment(customer.datetime).format('DD/MM/YYYY, hh:mm')
        }

        
      });
      this.sortByTimestamp(this.customers);
      this.filteredCustomers = [...this.customers];
    } catch (e) {
      console.error(e.stack);
    }
  }

  initCustomerSearch() {
    this.filter.valueChanges.subscribe(val => {
      this.filterQuery(val);
    });
  }

  filterQuery(val) {
    var val = val.toLowerCase();
    this.filteredCustomers = this.customers.filter(customer =>
      customer.datetime.toLowerCase().includes(val)
      || customer.sapID.toLowerCase().includes(val)
    );
  }

  sortByTimestamp(array) { 
    array.sort(function (a, b) {
      var timestampA = moment(a.datetime).unix();
      var timestampB = moment(b.datetime).unix();
      return timestampA > timestampB ? 1 : timestampB > timestampA ? -1 : 0;
    });
    
  }

}

