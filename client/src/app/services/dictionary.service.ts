import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  currrentLanguage: string = 'de';
  dictionaryDE = new Map([
    ['BCK', 'Zurück'],
    ['NXT', 'Weiter'],
    ['RST', 'Zurücksetzen'],

    ['PRS', 'Vorauswahl'],
    ['CUT', 'Kundentyp'],
    ['PRV', 'Privatkunde'],
    ['COM', 'Gewerbekunde'],
    ['DEB', 'Debitor'],
    ['KRE', 'Kreditor'],
    ['LEF', 'Rechtsform'],

    ['CND', 'Kontaktdaten'],
    ['NIF', 'Namensangaben'],
    ['ADR', 'Adresse'],
    ['CNA', 'Firma'],
    ['ANI', 'Zus. Namensangaben'],
    ['STR', 'Straße'],
    ['HNU', 'Hausnr.'],
    ['ZIP', 'Postleitzahl'],
    ['LOC', 'Ort'],
    ['COU', 'Land'],
  ])

  dictionaryEN = new Map([
    ['BCK', 'Back'],
    ['NXT', 'Next'],
    ['RST', 'Reset'],

    ['PRS', 'Preselection'],
    ['CUT', 'Customer type'],
    ['PRV', 'Commercial customer'],
    ['COM', 'Gewerbe'],
    ['DEB', 'Debtor'],
    ['KRE', 'Creditor'],
    ['LEF', 'Legal form'],

    ['CND', 'Contact information'],
    ['NIF', 'Name information'],
    ['ADR', 'Address'],
    ['CNA', 'Company'],
    ['ANI', 'Additional name information'],
    ['STR', 'Street'],
    ['HNU', 'HN'],
    ['ZIP', 'ZIP'],
    ['LOC', 'Location'],
    ['COU', 'Country'],
  ])

  dictionary = new Map([
    ['de', this.dictionaryDE],
    ['en', this.dictionaryEN]
  ])



  constructor() { }

  switchLanguage() {
    this.currrentLanguage = (this.currrentLanguage == 'de' ? 'en' : 'de')
  }

  get(abbreviation: string) {
    return this.dictionary.get(this.currrentLanguage).get(abbreviation);
  }
}
