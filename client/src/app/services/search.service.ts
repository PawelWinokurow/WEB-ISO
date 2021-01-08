import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { CodeDetails, IndustryFieldCode } from '../interfaces/lists';

/**
 * Enables free text search filtering.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  /**
   * Filters list of values.
   * @param ctrl Value to find
   * @param list List in which to search for
   * @param filteredValues Filtered values
   */
  filter(ctrl: FormControl, list: CodeDetails[], filteredValues: ReplaySubject<IndustryFieldCode[]>) {
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
