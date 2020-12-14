import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  filter(ctrl, list, filteredValues) {
    if (!list) {
      return;
    }
    let search = ctrl.value;
    if (!search) {
      filteredValues.next(list.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    filteredValues.next(
      list.filter(field => field.details.toLowerCase().indexOf(search) > -1)
    );
  }
}
