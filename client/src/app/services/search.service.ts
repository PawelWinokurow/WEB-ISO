import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { codeDetails, IndustryFieldCode } from '../interfaces/lists';

/**
 * Service enables free text search
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  /**
   * Filters list of values for free text search
   * @param ctrl value to find
   * @param list sheet in which to search for
   * @param filteredValues filtered values
   */
  filter(ctrl: FormControl, list: codeDetails[], filteredValues: ReplaySubject<IndustryFieldCode[]>) {
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
