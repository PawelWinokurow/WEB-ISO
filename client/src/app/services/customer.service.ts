import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { DateService } from './date.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpService, private http: HttpClient, private authService: AuthService,
    private dateService: DateService) { }

  /**
   * Sends customer to the server as JSON.
   * @param customer Object sapCustomer: SharedCustomer
   * @returns Response observable.
   */
  sendCustomer(customer) {
    return this.httpService.request(this.http.post(`${environment.serverURL}/customers`, { customer }))
  }

  /**
   * Sends customer creation request to the server as JSON.
   * @param customer Object sapCustomer: SharedCustomer
   * @returns Response observable.
   */
  sendCustomerRequest(customer) {
    return this.httpService.request(this.http.post(`${environment.serverURL}/customers/request`, { customer }))
  }

  getCustomers<T>(email){
    return this.httpService.request<T>(this.http.get(`${environment.serverURL}/customers?email=${email}`));
  }

  constructObject(generalInformation, contactInformation, payment, applicant, upload) {
    const data = {
      companyCode: this.authService.account.companyCode?.code ?? '',

      //Shared forms

      //General information
      legalForm: generalInformation?.get('legalForm')?.value?.code ?? '',
      interfaceNumber: generalInformation?.get('interfaceNumber')?.value ?? '',
      salutation: generalInformation?.get('salutation')?.value?.code ?? '0000',
      additionalName: generalInformation?.get("additionalName")?.value ?? '',

      //Address information
      street: contactInformation?.get("street")?.value ?? '',
      houseNumber: contactInformation?.get("houseNumber")?.value ?? '',
      mailbox: contactInformation?.get("mailbox")?.value ?? '',
      zipMailbox: contactInformation?.get("zipMailbox")?.value ?? '',
      zip: contactInformation?.get("zip")?.value ?? '',
      city: contactInformation?.get("city")?.value ?? '',
      country: contactInformation?.get("country")?.value?.code ?? '',
      phone: contactInformation?.get("phone")?.value ?? '',
      fax: contactInformation?.get("fax")?.value ?? '',
      mobile: contactInformation?.get("mobile")?.value ?? '',
      email: contactInformation?.get("email")?.value ?? '',

      //Payment
      taxId: payment?.get("taxId")?.value ?? '',
      vatId: payment?.get("vatId")?.value ?? '',
      industryFieldCode: payment?.get("industryFieldCode")?.value?.code ?? '',
      industryField: payment?.get("industryField")?.value?.code ?? '',
      iban: payment?.get("iban")?.value ?? '',
      bic: payment?.get("bic")?.value ?? '',
      bank: payment?.get("bank")?.value ?? '',
      paymentTerm: payment?.get("paymentTerm")?.value?.code ?? '',
      notes: payment?.get("notes")?.value ?? '',
      //Uploaded files
      files: upload?.get("files")?.value,

      //Person forms
      title: generalInformation?.get('title')?.value?.code ?? '',
      firstName: generalInformation?.get('firstName')?.value ?? '',
      secondName: generalInformation?.get('secondName')?.value ?? '',
      birthDate: generalInformation?.get("birthDate")?.value == null ? '' :
        this.dateService.formatDate(new Date(generalInformation?.get("birthDate").value)),

      //Person debit forms
      agb: payment?.get('agb')?.value ?? '',
      creditLimit: payment?.get('creditLimit')?.value ?? '',

      //Organization forms
      orgaPersons: generalInformation?.get('orgaPersons')?.value ?? '',

      //Organization debit forms

      //Applicant 0
      applicantSalutation0: applicant?.get('salutation')?.value?.code ?? '0000',
      applicantTitle0: applicant?.get('title')?.value?.code ?? '',
      applicantFirstName0: applicant?.get('firstName')?.value ?? '',
      applicantSecondName0: applicant?.get('secondName')?.value ?? '',
      applicantBirthDate0: applicant?.get('birthDate')?.value == null ? '' :
        this.dateService.formatDate(new Date(applicant?.get("birthDate").value)),
      applicantPhone0: applicant?.get('phone')?.value ?? '',
      applicantMobile0: applicant?.get('mobile')?.value ?? '',
      applicantEmail0: applicant?.get('email')?.value ?? '',

      //Applicant 1
      applicantSalutation1: applicant?.get('salutation1')?.value?.code ?? '0000',
      applicantTitle1: applicant?.get('title1')?.value?.code ?? '',
      applicantFirstName1: applicant?.get('firstName1')?.value ?? '',
      applicantSecondName1: applicant?.get('secondName1')?.value ?? '',
      applicantBirthDate1: applicant?.get('birthDate1')?.value == null ? '' :
        this.dateService.formatDate(new Date(applicant?.get("birthDate1").value)),
      applicantPhone1: applicant?.get('phone1')?.value ?? '',
      applicantMobile1: applicant?.get('mobile1')?.value ?? '',
      applicantEmail1: applicant?.get('email1')?.value ?? '',

      //Applicant 2
      applicantSalutation2: applicant?.get('salutation2')?.value?.code ?? '0000',
      applicantTitle2: applicant?.get('title2')?.value?.code ?? '',
      applicantFirstName2: applicant?.get('firstName2')?.value ?? '',
      applicantSecondName2: applicant?.get('secondName2')?.value ?? '',
      applicantBirthDate2: applicant?.get('birthDate2')?.value == null ? '' :
        this.dateService.formatDate(new Date(applicant?.get("birthDate2").value)),
      applicantPhone2: applicant?.get('phone2')?.value ?? '',
      applicantMobile2: applicant?.get('mobile2')?.value ?? '',
      applicantEmail2: applicant?.get('email2')?.value ?? '',

    };
    data.notes += payment?.get("sepa")?.value ? ' *SEPA-Mandat*' : '' 
    return data;
  }

}
