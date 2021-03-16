import { Injectable } from '@angular/core';

/**
 * Defines a map of labels and texts used in HTML.
 * There are two versions of mappings: one for English and one for German.
 */
@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  currentLanguage: string = 'Deutsch';

  languages = new Map([
    ['Deutsch', 'Deutsch'],
    ['English', 'English'],
  ]);

  dictionaryDE = new Map([
    ['LOGIN', 'Anmeldung'],
    ['HELLO', 'Hallo, '],
    ['ID', 'E-Mail oder Benutzername'],
    ['PSWDFOG', 'Passwort vergessen?'],
    
    ['NEWCUS', 'Neuer Kunde'],
    ['ACC', 'Konto'],
    ['LANG', 'Sprache'],
    ['LOGOUT', 'Abmelden'],
    ['ADMINAREA', 'Admin-Bereich'],
    
    ['USRNAME', 'Benutzername'],
    ['PSWD', 'Passwort'],
    ['USR', 'Benutzer'],
    ['ADM', 'Administrator'],
    ['CREATE', 'Anlegen'],

    ['RESETPSWD', 'Passwort zurücksetzen'],
    ['BLOCKUSR', 'Sperren'],
    ['UNBLOCKUSR', 'Entsperren'],
    ['DELUSR', 'Löschen'],
    ['BLOCKED', 'Gesperrt'],
    ['EXPAND', 'Alle ausklappen'],
    ['COLLAPSE', 'Alle zuklappen'],
    ['SEARCH', 'Suche'],
    ['ROLE', 'Rolle'],

    ['ACCSET', 'Kontoeinstellungen'],
    ['SECSET', 'Sicherheitseinstellungen'],

    ['NEWACC', 'Konto erstellen'],
    ['CONFIRM', 'Bestätigen'],
    ['PSWDCONF', 'Passwortbestätigung'],
    ['PSWDOLD', 'Altes Passwort'],
    ['PSWDOLDNMATCH', 'Das alte Passwort ist falsch.'],
    ['PSWDNMATCH', 'Die Passwörter stimmen nicht überein.'],
    ['IDUSED', 'Diese E-Mail-Adresse oder Benutzername wird bereits verwendet.'],
    ['IDINC', 'Ihr Benutzername/E-Mail-Adresse oder Ihr Passwort sind falsch.'],
    ['USRISBL', 'Der Benutzer wurde gesperrt.'],
    ['USRISUN', 'Der Benutzer wurde entsperrt.'],
    ['USRISDEL', 'Der Benutzer wurde gelöscht.'],
    ['PSWDISRES', 'Das Passwort wurde zurückgesetzt.'],
    
    ['NOTALLOWED', 'Sie sind nicht berechtigt auf diese Seite zuzugreifen. Sie werden zur Login-Seite weitergeleitet.'],

    ['APPLY', 'Übernehmen'],
    ['CHNGPSWD', 'Passwort ändern'],

    ['YES', 'Ja'],
    ['NO', 'Nein'],
    ['CAN', 'Abbrechen'],
    
    ['BCK', 'Zurück'],
    ['NXT', 'Weiter'],
    ['SND', 'Senden'],
    ['ADDFILE', 'Datei hinzufügen'],

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
    ['SNDCUS', 'Kunde senden'],
    ['SNDDIR', 'Direkt senden'],
    ['SNDCONFEMAIL', 'Bestätigungs-E-Mail senden'],

    ['DELUSR1', ""],
    ['DELUSR2', " löschen?"],
    ['RESETPSWD1', "Passwort von "],
    ['RESETPSWD2', " zurücksetzen?"],
    ['CUSISSND', 'Der Kunde wurde gesendet.'],
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
    ['PSWDFOG', 'Forgot password?'],
    
    ['NOTALLOWED', 'You are not allowed to view this page or take an action. You are redirected to enter the login page.'],
    
    ['APPLY', 'Apply'],
    ['CHNGPSWD', 'Change password'],
    ['NEWACC', 'Create account'],
    ['CONFIRM', 'Confirm'],
    ['PSWDCONF', 'Password confirmation'],
    ['PSWDOLD', 'Old password'],
    
    ['CREATE', 'Create'],
    ['USR', 'Account'],
    ['ADM', 'Administrator'],

    ['HELLO', 'Hello, '],
    ['NEWCUS', 'New customer'],
    ['LOGOUT', 'Sign out'],
    ['ACC', 'Account'],
    ['LANG', 'Language'],
    ['ADMINAREA', 'Admin area'],
    ['ROLE', 'Role'],

    ['ACCSET', 'Account settings'],
    ['SECSET', 'Security settings'],
    
    ['RESETPSWD', 'Reset password'],
    ['BLOCKUSR', 'Block'],
    ['UNBLOCKUSR', 'Unblock'],
    ['DELUSR', 'Delete'],
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
    ['SNDCUS', 'Send customer'],
    ['SNDDIR', 'Send directly'],
    ['SNDCONFEMAIL', 'Send confirmation email'],
    ['DELUSR1', "Delete "],
    ['DELUSR2', "?"],
    ['RESETPSWD1', "Reset password for "],
    ['RESETPSWD2', "?"],

    ['USRISNUPD', 'The account was not updated.'],

    ['SUC', 'Success!'],
    ['ERR', 'Error!'],

    //Messages
    ['USRISCR', 'The account was created.'],
    ['USRISUPD', 'The account was updated.'],
    ['CUSISSND', 'The customer was sent.'],
    ['CONFISSND', 'The confirmation email was sent to your email address.'],
    ['USRISBL', 'The account was blocked.'],
    ['USRISUN', 'The account was unblocked.'],
    ['USRISDEL', 'The account was deleted.'],
    ['PSWDISRES', 'The password was reset.'],

    //Errors
    ['PSWDNMATCH', 'The passwords do not match.'],
    ['PSWDOLDNMATCH', 'The old password does not match.'],
    ['IDUSED', 'This email address or username is already being used.'],
    ['IDINC', 'Your username/email or password are incorrect.'],

  ])

  dictionary = new Map([
    ['Deutsch', this.dictionaryDE],
    ['English', this.dictionaryEN]
  ])

  constructor() { }

  /**
   * Switches language between English and German.
   */
  switchLanguage() {
    this.currentLanguage = (this.currentLanguage == 'Deutsch' ? 'English' : 'Deutsch')
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
