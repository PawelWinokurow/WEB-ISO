import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  customerType = 'person';
  debitCreditType = 'debit';

  constructor() { }
}
