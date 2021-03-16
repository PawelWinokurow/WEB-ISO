/**
 * Code details fileds:
 * code: unique identifier also used in SAP system
 * details: details showed in browser
 */
export interface CodeDetails{
    code: string, 
    details: string,
}

export interface IndustryFieldCode extends CodeDetails {}
export interface PaymentTerm extends CodeDetails {}
export interface IndustryField extends CodeDetails {}
export interface CompanyCode extends CodeDetails {}
export interface LegalForm extends CodeDetails {}
export interface Title extends CodeDetails {}
export interface Salutation extends CodeDetails {}
export interface Country extends CodeDetails {}

