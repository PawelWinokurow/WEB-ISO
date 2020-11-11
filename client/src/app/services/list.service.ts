import { Injectable } from '@angular/core';
import { IndustryFieldCode, Land, PaymentTerm } from '../interfaces/lists';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  legalFormsOrganization: { name: string }[] = [
    { name: 'AG' },
    { name: 'eG E. Genossenschaft    ' },
    { name: 'eV Eingetr. Verein' },
    { name: 'GmbH' },
    { name: 'GmbH&Co.KG' },
    { name: 'KG' },
    { name: 'KGAA' },
    { name: 'OHG' },
    { name: 'S.E.' },
    { name: 'Staatl. Einrichtung' },
    { name: 'Stiftung' },
    { name: 'UG' },
    { name: 'UG&Co. KG' },
    { name: 'GbR Ges. bürg. Rechts' },
    { name: 'Sonstiges' },
    { name: 'Privat' },
  ];

  legalFormsPerson: { name: string }[] = [
    { name: 'Eingetragener Kfm.' },
    { name: 'Einzelunternehmen' },
    { name: 'Freier Beruf' },
    { name: 'Gewerbebetrieb' },
    { name: 'Landwirt' },
    { name: 'Privat' },
  ];

  titles: { name: string }[] = [
    { name: 'Dr.' },
    { name: 'Prof.' },
    { name: 'Prof. Dr.' },
    { name: 'B.A.' },
    { name: 'MBA' },
    { name: 'Ph.D.' },
  ]

  salutationsOrganization: { name: string }[] = [
    { name: 'Firma' },
    { name: 'Frau und Frau' },
    { name: 'Frau und Herrn' },
    { name: 'Herrn und Frau' },
    { name: 'Herrn und Herrn' },
  ]

  salutationsPerson: { name: string }[] = [
    { name: 'Herr' },
    { name: 'Frau' },
  ]

  paymentTermsDebit: PaymentTerm[] = [
    { code: '0000', details: 'B000/000/000 fällig sofort netto'},
    { code: '0300', details: 'D003/000/000: fällig in 3 Tagen netto'},
    { code: '0800', details: 'B008/000/000 fällig in 8 Tagen netto'},
    { code: '0820', details: 'B030/008/020 8 Tage mit  2,0 % Skto'},
    { code: '0830', details: 'B030/008/030 8 Tage mit  3,0 % Skto'},
  ];

  paymentTermsCredit: PaymentTerm[] = [
    { code: '0000', details: 'B000/000/000 fällig sofort netto'},
    { code: '0500', details: 'K005/000/000: Beleg-Datum + 5 Tage netto'},
    { code: '0700', details: 'K007/000/000: Beleg-Datum + 7 Tage netto'},
    { code: '0800', details: 'B008/000/000 fällig in 8 Tagen netto'},
    { code: '0820', details: 'B030/008/020 8 Tage mit  2,0 % Skto'},
    { code: '0830', details: 'B030/008/030 8 Tage mit  3,0 % Skto'},
  ];

  industryFields: { name: string }[] = [
    { name: 'A1' },
    { name: 'A3' },
    { name: 'A5' },
    { name: 'A7' },
    { name: 'A9' },
    { name: 'B1' },
    { name: 'C1' },
    { name: 'D1' },
    { name: 'E1' },
    { name: 'E5' },
    { name: 'F1' },
    { name: 'F3' },
    { name: 'F5' },
    { name: 'G1' },
    { name: 'G4' },
    { name: 'G7' },
    { name: 'H1' },
    { name: 'I1' },
    { name: 'J1' },
    { name: 'K1' },
    { name: 'L1' },
    { name: 'M1' },
    { name: 'N1' },
    { name: 'O1' },
    { name: 'P1' },
    { name: 'Q1' },
    { name: 'R1' },
    { name: 'S1' },
    { name: 'T1' },
    { name: 'U1' }
  ];

  industryFieldCodeA1: IndustryFieldCode[] = [
    { code: '0111', details: 'Anbau von Getreide (ohne Reis), Hülsenfrüchten und Ölsaaten'},
    { code: '0112', details: 'Anbau von Reis'},
    { code: '0113', details: 'Anbau von Gemüse und Melonen sowie Wurzeln und Knollen'},
    { code: '0114', details: 'Anbau von Zuckerrohr'},
    { code: '0115', details: 'Anbau von Tabak'},
    { code: '0116', details: 'Anbau von Faserpflanzen'},
    { code: '0119', details: 'Anbau von sonstigen einjährigen Pflanzen'},
    { code: '0121', details: 'Anbau von Wein- und Tafeltrauben'},
    { code: '0122', details: 'Anbau von tropischen und subtropischen Früchten'},
    { code: '0123', details: 'Anbau von Zitrusfrüchten'},
    { code: '0124', details: 'Anbau von Kern- und Steinobst'},
    { code: '0125', details: 'Anbau von sonstigem Obst und Nüssen'},
    { code: '0126', details: 'Anbau von ölhaltigen Früchten'},
    { code: '0127', details: 'Anbau von Pflanzen zur Herstellung von Getränken'},
    { code: '0128', details: 'Anbau von Gewürzpflanzen, Pflanzen für aromatische, narkotische und pharmazeutische Zwecke'},
    { code: '0129', details: 'Anbau sonstiger mehrjähriger Pflanzen'},
    { code: '0130', details: 'Betrieb von Baumschulen, sowie Anbau von Pflanzen zu Vermehrungszwecken'},
  ];

  industryFieldCodeA3: IndustryFieldCode[] = [
    { code: '0141', details: 'Haltung von Milchkühen'},
    { code: '0142', details: 'Haltung von Pferden und Eseln'},
    { code: '0143', details: 'Haltung von Kamelen'},
    { code: '0144', details: 'Haltung von Schafen und Ziegen'},
    { code: '0145', details: 'Haltung von Schweinen'},
    { code: '0146', details: 'Haltung von Geflügel'},
    { code: '0149', details: 'Sonstige Tierhaltung'},
  ];

  industryFieldCodes = new Map([
    ['A1', this.industryFieldCodeA1],
    ['A3', this.industryFieldCodeA3],
  ])


  locations: Land[] = [
    { name: 'Andorra', abbreviation: 'AD' },
    { name: 'Ver.Arab.Emir.', abbreviation: 'AE' },
    { name: 'Afghanistan', abbreviation: 'AF' },
    { name: 'Antigua/Barbuda', abbreviation: 'AG' },
    { name: 'Anguilla', abbreviation: 'AI' },
    { name: 'Albanien', abbreviation: 'AL' },
    { name: 'Armenien', abbreviation: 'AM' },
    { name: ' ', abbreviation: 'AN' },
    { name: 'Angola', abbreviation: 'AO' },
    { name: 'Antarktis', abbreviation: 'AQ' },
    { name: 'Argentinien', abbreviation: 'AR' },
    { name: 'Samoa, Amerikan', abbreviation: 'AS' },
    { name: 'Österreich', abbreviation: 'AT' },
    { name: 'Australien', abbreviation: 'AU' },
    { name: 'Aruba', abbreviation: 'AW' },
    { name: ' ', abbreviation: 'AX' },
    { name: 'Aserbaidschan', abbreviation: 'AZ' },
    { name: 'Bosnien-Herz.', abbreviation: 'BA' },
    { name: 'Barbados', abbreviation: 'BB' },
    { name: 'Bangladesch', abbreviation: 'BD' },
    { name: 'Belgien', abbreviation: 'BE' },
    { name: 'Burkina-Faso', abbreviation: 'BF' },
    { name: 'Bulgarien', abbreviation: 'BG' },
    { name: 'Bahrain', abbreviation: 'BH' },
    { name: 'Burundi', abbreviation: 'BI' },
    { name: 'Benin', abbreviation: 'BJ' },
    { name: 'Blue', abbreviation: 'BL' },
    { name: 'Bermuda', abbreviation: 'BM' },
    { name: 'Brunei Drussal.', abbreviation: 'BN' },
    { name: 'Bolivien', abbreviation: 'BO' },
    { name: 'Bonaire, Saba', abbreviation: 'BQ' },
    { name: 'Brasilien', abbreviation: 'BR' },
    { name: 'Bahamas', abbreviation: 'BS' },
    { name: 'Bhutan', abbreviation: 'BT' },
    { name: 'Bouvet Inseln', abbreviation: 'BV' },
    { name: 'Botsuana', abbreviation: 'BW' },
    { name: 'Belarus', abbreviation: 'BY' },
    { name: 'Belize', abbreviation: 'BZ' },
    { name: 'Kanada', abbreviation: 'DE' },
    { name: 'Kokosinseln', abbreviation: 'DE' },
    { name: 'Republik Kongo', abbreviation: 'DE' },
    { name: 'Zentralaf. Rep.', abbreviation: 'DE' },
    { name: 'Kongo', abbreviation: 'DE' },
    { name: 'Schweiz', abbreviation: 'DE' },
    { name: 'Elfenbeinküste', abbreviation: 'DE' },
    { name: 'Cookinseln', abbreviation: 'DE' },
    { name: 'Chile', abbreviation: 'DE' },
    { name: 'Kamerun', abbreviation: 'DE' },
    { name: 'China', abbreviation: 'DE' },
    { name: 'Kolumbien', abbreviation: 'DE' },
    { name: 'Costa Rica', abbreviation: 'DE' },
    { name: 'Serbien/Monten.', abbreviation: 'DE' },
    { name: 'Kuba', abbreviation: 'DE' },
    { name: 'Kap Verde', abbreviation: 'DE' },
    { name: 'Curaçao', abbreviation: 'DE' },
    { name: 'Weihnachtsinsel', abbreviation: 'DE' },
    { name: 'Zypern', abbreviation: 'DE' },
    { name: 'Tschechische Re', abbreviation: 'DE' },
    { name: 'Deutschland', abbreviation: 'DE' },
    { name: 'Dschibuti', abbreviation: 'DE' },
    { name: 'Dänemark', abbreviation: 'DE' },
    { name: 'Dominica', abbreviation: 'DE' },
    { name: 'Dominik. Rep.', abbreviation: 'DE' },
    { name: 'Algerien', abbreviation: 'DE' },
    { name: 'Ecuador', abbreviation: 'DE' },
    { name: 'Estland', abbreviation: 'DE' },
    { name: 'Ägypten', abbreviation: 'DE' },
    { name: 'West Sahara', abbreviation: 'DE' },
    { name: 'Eritrea', abbreviation: 'DE' },
    { name: 'Spanien', abbreviation: 'DE' },
    { name: 'Äthiopien', abbreviation: 'DE' },
    { name: 'Europäische U.', abbreviation: 'DE' },
    { name: 'Finnland', abbreviation: 'DE' },
    { name: 'Fidschi', abbreviation: 'DE' },
    { name: 'Falklandinseln', abbreviation: 'DE' },
    { name: 'Mikronesien', abbreviation: 'DE' },
    { name: 'Färöer', abbreviation: 'DE' },
    { name: 'Frankreich', abbreviation: 'DE' },
    { name: 'Gabun', abbreviation: 'DE' },
    { name: 'Verein. Königr.', abbreviation: 'DE' },
    { name: 'Grenada', abbreviation: 'DE' },
    { name: 'Georgien', abbreviation: 'DE' },
    { name: 'Französ.Guayana', abbreviation: 'DE' },
    { name: 'Gournsey', abbreviation: 'DE' },
    { name: 'Ghana', abbreviation: 'DE' },
    { name: 'Gibraltar', abbreviation: 'DE' },
    { name: 'Grönland', abbreviation: 'DE' },
    { name: 'Gambia', abbreviation: 'DE' },
    { name: 'Guinea', abbreviation: 'DE' },
    { name: 'Guadeloupe', abbreviation: 'DE' },
    { name: 'Äquatorialguine', abbreviation: 'DE' },
    { name: 'Griechenland', abbreviation: 'DE' },
    { name: 'S. Sandwich Ins', abbreviation: 'DE' },
    { name: 'Guatemala', abbreviation: 'DE' },
    { name: 'Guam', abbreviation: 'DE' },
    { name: 'Guinea-Bissau', abbreviation: 'DE' },
    { name: 'Guyana', abbreviation: 'DE' },
    { name: 'Hongkong', abbreviation: 'DE' },
    { name: 'Heard/McDon.Ins', abbreviation: 'DE' },
    { name: 'Honduras', abbreviation: 'DE' },
    { name: 'Kroatien', abbreviation: 'DE' },
    { name: 'Haiti', abbreviation: 'DE' },
    { name: 'Ungarn', abbreviation: 'DE' },
    { name: 'Indonesien', abbreviation: 'DE' },
    { name: 'Irland', abbreviation: 'DE' },
    { name: 'Israel', abbreviation: 'DE' },
    { name: 'Man Insel', abbreviation: 'DE' },
    { name: 'Indien', abbreviation: 'DE' },
    { name: 'Brit.Geb.Ind.Oz', abbreviation: 'DE' },
    { name: 'Irak', abbreviation: 'DE' },
    { name: 'Iran', abbreviation: 'DE' },
    { name: 'Island', abbreviation: 'DE' },
    { name: 'Italien', abbreviation: 'DE' },
    { name: 'Jersey', abbreviation: 'DE' },
    { name: 'Jamaika', abbreviation: 'DE' },
    { name: 'Jordanien', abbreviation: 'DE' },
    { name: 'Japan', abbreviation: 'DE' },
    { name: 'Kenia', abbreviation: 'DE' },
    { name: 'Kirgisistan', abbreviation: 'DE' },
    { name: 'Kambodscha', abbreviation: 'DE' },
    { name: 'Kiribati', abbreviation: 'DE' },
    { name: 'Komoren', abbreviation: 'DE' },
    { name: 'St.Kitts&Nevis', abbreviation: 'DE' },
    { name: 'Nordkorea', abbreviation: 'DE' },
    { name: 'Südkorea', abbreviation: 'DE' },
    { name: 'Kuwait', abbreviation: 'DE' },
    { name: 'Kaimaninseln', abbreviation: 'DE' },
    { name: 'Kasachstan', abbreviation: 'DE' },
    { name: 'Laos', abbreviation: 'DE' },
    { name: 'Libanon', abbreviation: 'DE' },
    { name: 'St. Lucia', abbreviation: 'DE' },
    { name: 'Liechtenstein', abbreviation: 'DE' },
    { name: 'Sri Lanka', abbreviation: 'DE' },
    { name: 'Liberia', abbreviation: 'DE' },
    { name: 'Lesotho', abbreviation: 'DE' },
    { name: 'Litauen', abbreviation: 'DE' },
    { name: 'Luxemburg', abbreviation: 'DE' },
    { name: 'Lettland', abbreviation: 'DE' },
    { name: 'Libyen', abbreviation: 'DE' },
    { name: 'Marokko', abbreviation: 'DE' },
    { name: 'Monaco', abbreviation: 'DE' },
    { name: 'Moldau', abbreviation: 'DE' },
    { name: '      ', abbreviation: 'DE' },
    { name: '        ', abbreviation: 'DE' },
    { name: 'Madagaskar', abbreviation: 'DE' },
    { name: 'Marshall-Insel', abbreviation: 'DE' },
    { name: 'Nordmazedonien', abbreviation: 'DE' },
    { name: 'Mali', abbreviation: 'DE' },
    { name: 'Myanmar', abbreviation: 'DE' },
    { name: 'Mongolei', abbreviation: 'DE' },
    { name: 'Macau', abbreviation: 'DE' },
    { name: 'Nördl. Marianen', abbreviation: 'DE' },
    { name: 'Martinique', abbreviation: 'DE' },
    { name: 'Mauretanien', abbreviation: 'DE' },
    { name: 'Montserrat', abbreviation: 'DE' },
    { name: 'Malta', abbreviation: 'DE' },
    { name: 'Mauritius', abbreviation: 'DE' },
    { name: 'Malediven', abbreviation: 'DE' },
    { name: 'Malawi', abbreviation: 'DE' },
    { name: 'Mexiko', abbreviation: 'DE' },
    { name: 'Malaysia', abbreviation: 'DE' },
    { name: 'Mosambik', abbreviation: 'DE' },
    { name: 'Namibia', abbreviation: 'DE' },
    { name: 'Neukaledonien', abbreviation: 'DE' },
    { name: 'Niger', abbreviation: 'DE' },
    { name: 'Norfolkinseln', abbreviation: 'DE' },
    { name: 'Nigeria', abbreviation: 'DE' },
    { name: 'Nicaragua', abbreviation: 'DE' },
    { name: 'Niederlande', abbreviation: 'DE' },
    { name: 'Norwegen', abbreviation: 'DE' },
    { name: 'Nepal', abbreviation: 'DE' },
    { name: 'Nauru', abbreviation: 'DE' },
    { name: 'NATO', abbreviation: 'DE' },
    { name: 'Niue-Inseln', abbreviation: 'DE' },
    { name: 'Neuseeland', abbreviation: 'DE' },
    { name: 'Oman', abbreviation: 'DE' },
    { name: 'Orange', abbreviation: 'DE' },
    { name: 'Panama', abbreviation: 'DE' },
    { name: 'Peru', abbreviation: 'DE' },
    { name: 'FranzPolynesien', abbreviation: 'DE' },
    { name: 'Papua-Neuguinea', abbreviation: 'DE' },
    { name: 'Philippinen', abbreviation: 'DE' },
    { name: 'Pakistan', abbreviation: 'DE' },
    { name: 'Polen', abbreviation: 'DE' },
    { name: 'StPier.,Miquel.', abbreviation: 'DE' },
    { name: 'Pitcairn Inseln', abbreviation: 'DE' },
    { name: 'Puerto Rico', abbreviation: 'DE' },
    { name: 'Palästina', abbreviation: 'DE' },
    { name: 'Portugal', abbreviation: 'DE' },
    { name: 'Palau', abbreviation: 'DE' },
    { name: 'Paraguay', abbreviation: 'DE' },
    { name: 'Katar', abbreviation: 'DE' },
    { name: 'Reunion', abbreviation: 'DE' },
    { name: 'Rumänien', abbreviation: 'DE' },
    { name: ' ', abbreviation: 'DE' },
    { name: 'Russische Foed.', abbreviation: 'DE' },
    { name: 'Ruanda', abbreviation: 'DE' },
    { name: 'Saudi-Arabien', abbreviation: 'DE' },
    { name: 'Salomonen', abbreviation: 'DE' },
    { name: 'Seychellen', abbreviation: 'DE' },
    { name: 'Sudan', abbreviation: 'DE' },
    { name: 'Schweden', abbreviation: 'DE' },
    { name: 'Singapur', abbreviation: 'DE' },
    { name: 'St. Helena', abbreviation: 'DE' },
    { name: 'Slowenien', abbreviation: 'DE' },
    { name: 'Svalbard', abbreviation: 'DE' },
    { name: 'Slowakei', abbreviation: 'DE' },
    { name: 'Sierra Leone', abbreviation: 'DE' },
    { name: 'San Marino', abbreviation: 'DE' },
    { name: 'Senegal', abbreviation: 'DE' },
    { name: 'Somalia', abbreviation: 'DE' },
    { name: 'Suriname', abbreviation: 'DE' },
    { name: 'Südsudan', abbreviation: 'DE' },
    { name: 'S.Tome,Principe', abbreviation: 'DE' },
    { name: 'El Salvador', abbreviation: 'DE' },
    { name: 'Sint Maarten', abbreviation: 'DE' },
    { name: 'Syrien', abbreviation: 'DE' },
    { name: 'Swasiland', abbreviation: 'DE' },
    { name: 'Turks-,Caicosin', abbreviation: 'DE' },
    { name: 'Tschad', abbreviation: 'DE' },
    { name: 'French S.Territ', abbreviation: 'DE' },
    { name: 'Togo', abbreviation: 'DE' },
    { name: 'Thailand', abbreviation: 'DE' },
    { name: 'Tadschikistan', abbreviation: 'DE' },
    { name: 'Tokelau-Inseln', abbreviation: 'DE' },
    { name: 'Osttimor', abbreviation: 'DE' },
    { name: 'Turkmenistan', abbreviation: 'DE' },
    { name: 'Tunesien', abbreviation: 'DE' },
    { name: 'Tonga', abbreviation: 'DE' },
    { name: 'Ost Timor', abbreviation: 'DE' },
    { name: 'Türkei', abbreviation: 'DE' },
    { name: 'Trinidad,Tobago', abbreviation: 'DE' },
    { name: 'Tuvalu', abbreviation: 'DE' },
    { name: 'Taiwan', abbreviation: 'DE' },
    { name: 'Tansania', abbreviation: 'DE' },
    { name: 'Ukraine', abbreviation: 'DE' },
    { name: 'Uganda', abbreviation: 'DE' },
    { name: 'Minor Outl.Ins.', abbreviation: 'DE' },
    { name: 'Vereinigte Nat.', abbreviation: 'DE' },
    { name: 'USA', abbreviation: 'DE' },
    { name: 'Uruguay', abbreviation: 'DE' },
    { name: 'Usbekistan', abbreviation: 'DE' },
    { name: 'Vatikanstadt', abbreviation: 'DE' },
    { name: 'St. Vincent', abbreviation: 'DE' },
    { name: 'Venezuela', abbreviation: 'DE' },
    { name: 'Brit.Jungferni.', abbreviation: 'DE' },
    { name: 'Amer.Jungferni.', abbreviation: 'DE' },
    { name: 'Vietnam', abbreviation: 'DE' },
    { name: 'Vanuatu', abbreviation: 'DE' },
    { name: 'Wallis,Futuna', abbreviation: 'DE' },
    { name: 'Westsamoa', abbreviation: 'DE' },
    { name: 'Serbien', abbreviation: 'DE' },
    { name: 'Jemen', abbreviation: 'DE' },
    { name: 'Mayotte', abbreviation: 'DE' },
    { name: 'Südafrika', abbreviation: 'DE' },
    { name: 'Sambia', abbreviation: 'DE' },
    { name: 'Simbabwe', abbreviation: 'DE' },

  ];



  constructor() { }
}
