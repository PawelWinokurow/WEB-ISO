import { Injectable } from '@angular/core';

/**
 * Defines a service for Date operations.
 */
@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  /**
   * Formats date to YYYY-MM-DD format.
   * @param date JavaScript Date
   * @returns Formatted date.
   */
  formatDate(date: Date) {
    var month = '' + (date.getMonth() + 1)
    var day = '' + date.getDate()
    var year = date.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return `${year}-${month}-${day}`
  }
}
