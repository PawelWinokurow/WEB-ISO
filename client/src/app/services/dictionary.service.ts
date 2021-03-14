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
    ['LOGIN', 'Anmeldung'],
    ['USRNAME', 'Benutzername'],
    ['PSWD', 'Passwort'],
    ['ID', 'E-Mail oder Benutzername'],

    ['NEWCUSTOMER', 'Neuer Kunde'],
    ['SETTINGS', 'Einstellungen'],
    ['LOGOUT', 'Abmelden'],
    ['ADMINAREA', 'Admin-Bereich'],
    ['ROLE', 'Rolle'],

    ['RESETPSWD', 'Passwort zurücksetzen'],
    ['BLOCKUSR', 'Benutzer sperren'],
    ['UNBLOCKUSR', 'Benutzer entsperren'],
    ['DELUSR', 'Benutzer löschen'],
    ['BLOCKED', 'Gesperrt'],
    ['EXPAND', 'Alle ausklappen'],
    ['COLLAPSE', 'Alle zuklappen'],
    ['SEARCH', 'Suche'],

    ['NEWACC', 'Konto erstellen'],
    ['CONFIRM', 'Bestätigen'],
    ['PSWDCONF', 'Passwortbestätigung'],
    ['PSWDOLD', 'Altes Passwort'],
    ['PSWDNMATCH', 'Die Passwörter stimmen nicht überein'],
    ['IDUSED', 'Diese E-Mail-Adresse oder Benutzername wird bereits verwendet.'],
    ['IDINC', 'Ihr Benutzername/E-Mail-Adresse oder Ihr Passwort sind falsch.'],
    ['USRISBL', 'Der Benutzer wurde gesperrt.'],
    ['USRISUN', 'Der Benutzer wurde entsperrt.'],
    ['USRISDEL', 'Der Benutzer wurde gelöscht.'],
    ['PSWDISRES', 'Das Passwort wurde zurückgesetzt.'],
    
    ['NOTALLOWED', 'Sie sind nicht berechtigt auf diese Seite zuzugreifen. Sie werden zur Login-Seite weitergeleitet.'],

    ['CHNG', 'Ändern'],
    ['CHNGPSWD', 'Passwort ändern'],

    ['YES', 'Ja'],
    ['NO', 'Nein'],
    ['CAN', 'Abbrechen'],
    
    ['BCK', 'Zurück'],
    ['NXT', 'Weiter'],
    ['SND', 'Senden'],
    ['ADDFILE', 'Datei hinzufügen'],

    ['GENMSK', 'Maske generieren'],

    ['PRESEL', 'Vorauswahl'],
    ['CUSTYPE', 'Kundentyp'],
    ['PER', 'Person'],
    ['ORG', 'Organisation'],
    ['DEB', 'Debitor'],
    ['CRE', 'Kreditor'],
    ['COMCODE', 'Buchungskreis'],

    ['LEGFRM', 'Rechtsform'],
    ['INTERFNUM', 'Schnittstellennummer'],

    ['CONTACT', 'Kontaktdaten'],
    ['GENINF', 'Allgemeine Informationen'],
    ['ADDRINF', 'Adressinformationen'],
    ['PAYINF', 'Zahlungsinformationen'],
    ['ATTACH', 'Datei anhängen'],

    ['NAME', 'Namensangaben'],
    ['ADDR', 'Anschrift'],
    ['ADNAME', 'Zus. Namensangaben (c/o)'],
    ['BRTH', 'Geburtsdatum'],
    ['STR', 'Straße'],
    ['HNO', 'Hnr.'],
    ['MAILBX', 'Postfach'],
    ['MAILBXZIP', 'Postfach PLZ'],
    ['ZIP', 'PLZ'],
    ['CITY', 'Ort'],
    ['COU', 'Land'],
    ['TEL', 'Telefon'],
    ['FAX', 'Telefax'],
    ['MOB', 'Mobiltelefon'],
    ['EMAIL', 'E-Mail-Adresse'],

    ['TAX', 'Steuernummer'],
    ['VAT', 'Umsatzsteuer-ID'],
    ['INDFI', 'Branche'],
    ['INDFICODE', 'Branchencode'],
    ['HSEPA', 'Lieferant hat SEPA-Lastschrift'],
    ['GSEPA', 'SEPA-Lastschrift erteilen'],
    ['RSEPA', 'SEPA-Lastschrift anfordern'],
    ['IBA', 'IBAN'],
    ['BIC', 'BIC'],
    ['BANK', 'Kreditinstitut'],
    ['PAYTERMS', 'Zahlungsbedingung'],
    ['CRELMT', 'Kreditlimit'],
    ['REMARKS', 'Bemerkungsfeld'],

    ['APP', 'Antragsteller'],
    ['APP1', '1. Antragsteller'],
    ['APP2', '2. Antragsteller'],
   
    ['TITLE', 'Titel'],
    ['SAL', 'Anrede'],
    ['COMPERS', 'Firma / Personen'],

    ['LNAME', 'Vorname'],
    ['SNAME', 'Nachname'],
    
    ['ENTEMAIL', 'Bitte geben Sie Ihre E-Mail-Adresse ein.'],
    ['SUBMIT', 'Einreichen'],
    ['SNDMSK', 'Maske senden'],
    ['SNDDIR', 'Direkt senden'],
    ['SNDCONFEMAIL', 'Bestätigungs-E-Mail senden'],

    ['DELUSR1', ""],
    ['DELUSR2', " löschen?"],
    ['RESETPSWD1', "Passwort von "],
    ['RESETPSWD2', " zurücksetzen?"],
    ['MSKISSND', 'Die Maske wurde gesendet.'],
    ['CONFISSND', 'Die Bestätigungs-E-Mail wurde an Ihre E-Mail-Adresse gesendet.'],
    ['USRISCR', 'Der Benutzer wurde angelegt.'],
    ['USRISUPD', 'Der Benutzer wurde geändert.'],
    ['USRISNUPD', 'Der Benutzer wurde nicht geändert.'],

    ['SUC', 'Erfolg!'],
    ['ERR', 'Fehler!'],
  ])

  dictionaryEN = new Map([

    ['LOGIN', 'Sign in'],
    ['USRNAME', 'Username'],
    ['PSWD', 'Password'],
    ['ID', 'Email or username'],
    
    ['NEWACC', 'Create account'],
    ['CONFIRM', 'Confirm'],
    ['PSWDCONF', 'Password confirmation'],
    ['PSWDOLD', 'Old password'],
    ['PSWDNMATCH', 'The passwords do not match'],
    ['IDUSED', 'This email address or username is already being used.'],
    ['IDINC', 'Your username/email or password are incorrect.'],
    ['USRISBL', 'The user was blocked.'],
    ['USRISUN', 'The user was unblocked.'],
    ['USRISDEL', 'The user was deleted.'],
    ['PSWDISRES', 'The password was reset.'],
    
    ['NOTALLOWED', 'You are not allowed to view this page or take an action. You are redirected to enter the login page.'],
    
    ['CHNG', 'Change'],
    ['CHNGPSWD', 'Change password'],
    
    ['NEWCUSTOMER', 'New customer'],
    ['LOGOUT', 'Sign out'],
    ['SETTINGS', 'Settings'],
    ['ADMINAREA', 'Admin area'],
    ['ROLE', 'Role'],
    
    ['RESETPSWD', 'Reset password'],
    ['BLOCKUSR', 'Block user'],
    ['UNBLOCKUSR', 'Unblock user'],
    ['DELUSR', 'Delete user'],
    ['BLOCKED', 'Blocked'],
    ['EXPAND', 'Expand all'],
    ['COLLAPSE', 'Collapse all'],
    ['SEARCH', 'Search'],

    ['YES', 'Yes'],
    ['NO', 'No'],
    ['CAN', 'Cancel'],

    ['BCK', 'Back'],
    ['NXT', 'Next'],
    ['SND', 'Send'],
    ['ADDFILE', 'Add file'],
    
    ['GENMSK', 'Generate mask'],
    ['PRESEL', 'Preselection'],
    ['CUSTYPE', 'Customer type'],
    ['PER', 'Person'],
    ['DEB', 'Debitor'],
    ['CRE', 'Creditor'],
    ['COMCODE', 'Comapany code'],
    
    ['LEGFRM', 'Legal form'],
    
    ['INTERFNUM', 'Interface number'],
    
    ['CONTACT', 'Contact'],
    ['GENINF', 'General information'],
    ['ADDRINF', 'Address information'],
    ['PAYINF', 'Payment information'],
    ['ATTACH', 'Attach file'],

    ['NAME', 'Name'],
    ['ADDR', 'Address'],
    ['ORG', 'Organization'],
    ['ADNAME', 'Additional name'],
    ['BRTH', 'Birth date'],
    ['STR', 'Street'],
    ['HNO', 'House no.'],
    ['MAILBX', 'Mailbox'],
    ['MAILBXZIP', 'Mailbox ZIP'],
    ['ZIP', 'ZIP'],
    ['CITY', 'City'],
    ['COU', 'Country'],
    ['TEL', 'Phone'],
    ['FAX', 'Fax'],
    ['MOB', 'Mobile phone'],
    ['EMAIL', 'Email address'],

    ['TAX', 'Tax ID'],
    ['VAT', 'VAT ID'],
    ['INDFI', 'Industry field'],
    ['INDFICODE', 'Industry field code'],
    ['HSEPA', 'Supplier has SEPA direct debit'],
    ['GSEPA', 'Grant SEPA direct debit'],
    ['RSEPA', 'Request SEPA direct debit'],
    ['IBA', 'IBAN'],
    ['BIC', 'BIC'],
    ['BANK', 'Credit institution'],
    ['CRELMT', 'Credit limit'],
    ['PAYTERMS', 'Terms of payment'],
    ['REMARKS', 'Remarks field'],

    ['APP', 'Applicant'],
    ['APP1', 'Applicant 1'],
    ['APP2', 'Applicant 2'],

    ['TITLE', 'Title'],
    ['SAL', 'Salutation'],
    ['COMPERS', 'Company / Persons'],
    ['LNAME', 'Name'],
    ['SNAME', 'Surname'],
    
    ['ENTEMAIL', 'Please enter your email address.'],
    ['SUBMIT', 'Submit'],
    ['SNDMSK', 'Send mask'],
    ['SNDDIR', 'Send directly'],
    ['SNDCONFEMAIL', 'Send confirmation email'],
    ['DELUSR1', "Delete "],
    ['DELUSR2', "?"],
    ['RESETPSWD1', "Reset password for "],
    ['RESETPSWD2', "?"],
    ['USRISCR', 'The user was created.'],
    ['USRISUPD', 'The user was updated.'],
    ['USRISNUPD', 'The user was not updated.'],

    ['MSKISSND', 'The mask was sent.'],
    ['CONFISSND', 'The confirmation email was sent to your email address.'],
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
