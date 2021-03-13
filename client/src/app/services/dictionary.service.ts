import { Injectable } from '@angular/core';

/**
 * Defines a map of labels and texts used in HTML.
 * There are two versions of mappings: one for English and one for German.
 */
@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  currentLanguage: string = 'DE';

  languages = new Map([
    ['DE', 'Deutsch'],
    ['EN', 'English'],
  ]);

  dictionaryDE = new Map([
    ['LOG', 'Anmeldung'],
    ['USR', 'Benutzername'],
    ['PSW', 'Passwort'],
    ['EUN', 'E-Mail oder Benutzername'],

    ['NCU', 'Neuer Kunde'],
    ['SET', 'Einstellungen'],
    ['LOT', 'Abmelden'],
    ['ADA', 'Admin-Bereich'],
    ['ROL', 'Rolle'],

    ['RES', 'Passwort zurücksetzen'],
    ['BLU', 'Benutzer sperren'],
    ['ULU', 'Benutzer entsperren'],
    ['DEU', 'Benutzer löschen'],
    ['BLO', 'Gesperrt'],
    ['EAL', 'Alle ausklappen'],
    ['CAL', 'Alle zuklappen'],

    ['NAC', 'Konto erstellen'],
    ['CFM', 'Bestätigen'],
    ['PCO', 'Passwortbestätigung'],
    ['PNS', 'Die Passwörter stimmen nicht überein'],
    ['UAE', 'Diese E-Mail-Adresse oder Benutzername wird bereits verwendet.'],
    ['ICL', 'Ihr Benutzername/E-Mail-Adresse oder Ihr Passwort sind falsch.'],
    ['USB', 'Der Benutzer wurde gesperrt.'],
    ['USU', 'Der Benutzer wurde entsperrt.'],
    ['USD', 'Der Benutzer wurde gelöscht.'],
    ['PAR', 'Das Passwort wurde zurückgesetzt.'],
    
    ['CHA', 'Ändern'],

    ['YES', 'Ja'],
    ['NOO', 'Nein'],
    ['CAN', 'Abbrechen'],
    
    ['BCK', 'Zurück'],
    ['NXT', 'Weiter'],
    ['SND', 'Senden'],
    ['ATB', 'Datei hinzufügen'],

    ['MGE', 'Maske generieren'],

    ['PRS', 'Vorauswahl'],
    ['CUT', 'Kundentyp'],
    ['PER', 'Person'],
    ['ORG', 'Organisation'],
    ['DEB', 'Debitor'],
    ['CRE', 'Kreditor'],
    ['CCO', 'Buchungskreis'],

    ['LEF', 'Rechtsform'],
    ['SSN', 'Schnittstellennummer'],

    ['CND', 'Kontaktdaten'],
    ['GEI', 'Allgemeine Informationen'],
    ['ADI', 'Adressinformationen'],
    ['PAI', 'Zahlungsinformationen'],
    ['ATF', 'Datei anhängen'],

    ['NIF', 'Namensangaben'],
    ['ADR', 'Anschrift'],
    ['CON', 'Kontakt'],
    ['ANI', 'Zus. Namensangaben (c/o)'],
    ['BRT', 'Geburtsdatum'],
    ['STR', 'Straße'],
    ['HNU', 'Hnr.'],
    ['MBX', 'Postfach'],
    ['MBP', 'Postfach PLZ'],
    ['ZIP', 'PLZ'],
    ['CIT', 'Ort'],
    ['COU', 'Land'],
    ['TEL', 'Telefon'],
    ['FAX', 'Telefax'],
    ['MOB', 'Mobiltelefon'],
    ['EMA', 'E-Mail-Adresse'],

    ['TAX', 'Steuernummer'],
    ['VAT', 'Umsatzsteuer-ID'],
    ['IFI', 'Branche'],
    ['IFC', 'Branchencode'],
    ['HSP', 'Lieferant hat SEPA-Lastschrift'],
    ['GSP', 'SEPA-Lastschrift erteilen'],
    ['RSP', 'SEPA-Lastschrift anfordern'],
    ['IBA', 'IBAN'],
    ['BIC', 'BIC'],
    ['BNK', 'Kreditinstitut'],
    ['TPA', 'Zahlungsbedingung'],
    ['CRL', 'Kreditlimit'],
    ['REF', 'Bemerkungsfeld'],

    ['APP', 'Antragsteller'],
    ['AP1', '1. Antragsteller'],
    ['AP2', '2. Antragsteller'],
   
    ['TLE', 'Titel'],
    ['SAL', 'Anrede'],
    ['COP', 'Firma / Personen'],

    ['FNA', 'Vorname'],
    ['SNA', 'Nachname'],
    
    ['EEM', 'Bitte geben Sie Ihre E-Mail-Adresse ein.'],
    ['SUB', 'Einreichen'],
    ['SMA', 'Maske senden'],
    ['SDI', 'Direkt senden'],
    ['SEM', 'Bestätigungs-E-Mail senden'],
    ['DIQ', 'Wollen Sie die Maske direkt senden?'],    
    ['DU1', ""],
    ['DU2', " löschen?"],
    ['RP1', "Passwort von "],
    ['RP2', " zurücksetzen?"],
    ['SNT', 'Die Maske wurde gesendet.'],
    ['SNE', 'Die Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet.'],
    ['UWC', 'Der Benutzer wurde angelegt.'],
    ['UWU', 'Der Benutzer wurde geändert.'],
    ['UWN', 'Der Benutzer wurde nicht geändert.'],

    ['SUC', 'Erfolg!'],
    ['ERR', 'Fehler!'],
  ])

  dictionaryEN = new Map([

    ['LOG', 'Sign in'],
    ['USR', 'Username'],
    ['PSW', 'Password'],
    ['EUN', 'Email or username'],
    
    ['NAC', 'Create account'],
    ['CFM', 'Confirm'],
    ['PCO', 'Password confirmation'],
    ['PNS', 'The passwords do not match'],
    ['UAE', 'This email address or username is already being used.'],
    ['ICL', 'Your username/email or password are incorrect.'],
    ['USB', 'The user was blocked.'],
    ['USU', 'The user was unblocked.'],
    ['USD', 'The user was deleted.'],
    ['PAR', 'The password was reset.'],
    
    ['CHA', 'Change'],
    
    ['NCU', 'New customer'],
    ['LOT', 'Sign out'],
    ['SET', 'Settings'],
    ['ADA', 'Admin area'],
    ['ROL', 'Role'],
    
    ['RES', 'Reset password'],
    ['BLU', 'Block user'],
    ['ULU', 'Unblock user'],
    ['DEU', 'Delete user'],
    ['BLO', 'Blocked'],
    ['EAL', 'Expand all'],
    ['CAL', 'Collapse all'],

    ['YES', 'Yes'],
    ['NOO', 'No'],
    ['CAN', 'Cancel'],

    ['BCK', 'Back'],
    ['NXT', 'Next'],
    ['SND', 'Send'],
    ['ATB', 'Add file'],
    
    ['MGE', 'Generate mask'],
    ['PRS', 'Preselection'],
    ['CUT', 'Customer type'],
    ['PER', 'Person'],
    ['DEB', 'Debitor'],
    ['CRE', 'Creditor'],
    ['CCO', 'Comapany code'],
    
    ['LEF', 'Legal form'],
    
    ['SSN', 'Interface number'],
    
    ['CND', 'Contact'],
    ['GEI', 'General information'],
    ['ADI', 'Address information'],
    ['PAI', 'Payment information'],
    ['ATF', 'Attach file'],

    ['NIF', 'Name'],
    ['ADR', 'Address'],
    ['CON', 'Contact'],
    ['ORG', 'Organization'],
    ['ANI', 'Additional name'],
    ['BRT', 'Birth date'],
    ['STR', 'Street'],
    ['HNU', 'House no.'],
    ['MBX', 'Mailbox'],
    ['MBP', 'Mailbox ZIP'],
    ['ZIP', 'ZIP'],
    ['CIT', 'City'],
    ['COU', 'Country'],
    ['TEL', 'Phone'],
    ['FAX', 'Fax'],
    ['MOB', 'Mobile phone'],
    ['EMA', 'Email address'],

    ['TAX', 'Tax ID'],
    ['VAT', 'VAT ID'],
    ['IFI', 'Industry field'],
    ['IFC', 'Industry field code'],
    ['HSP', 'Supplier has SEPA direct debit'],
    ['GSP', 'Grant SEPA direct debit'],
    ['RSP', 'Request SEPA direct debit'],
    ['IBA', 'IBAN'],
    ['BIC', 'BIC'],
    ['BNK', 'Credit institution'],
    ['CRL', 'Credit limit'],
    ['TPA', 'Terms of payment'],
    ['REF', 'Remarks field'],

    ['APP', 'Applicant'],
    ['AP1', 'Applicant 1'],
    ['AP2', 'Applicant 2'],

    ['TLE', 'Title'],
    ['SAL', 'Salutation'],
    ['COP', 'Company / Persons'],
    ['FNA', 'Name'],
    ['SNA', 'Surname'],
    
    ['EEM', 'Please enter your email address.'],
    ['SUB', 'Submit'],
    ['SMA', 'Send mask'],
    ['SDI', 'Send directly'],
    ['SEM', 'Send confirmation email'],
    ['DIQ', 'Do you want to send the mask directly?'],
    ['DU1', "Delete "],
    ['DU2', "?"],
    ['RP1', "Reset password for "],
    ['RP2', "?"],
    ['UWC', 'The user was created.'],
    ['UWU', 'The user was updated.'],
    ['UWN', 'The user was not updated.'],

    ['SNT', 'The mask was sent.'],
    ['SNE', 'The confirmation email was sent to your email address.'],
    ['SUC', 'Success!'],
    ['ERR', 'Error!'],
  ])

  dictionary = new Map([
    ['DE', this.dictionaryDE],
    ['EN', this.dictionaryEN]
  ])

  constructor() { }

  /**
   * Switches language between English and German.
   */
  switchLanguage() {
    this.currentLanguage = (this.currentLanguage == 'DE' ? 'EN' : 'DE')
  }

  /**
   * Takes an abbreviation and returns the corresponding value.
   * @param abbreviation Map key 
   * @returns Mapping. 
   */
  get(abbreviation: string): string {
    return this.dictionary.get(this.currentLanguage).get(abbreviation);
  }
}
