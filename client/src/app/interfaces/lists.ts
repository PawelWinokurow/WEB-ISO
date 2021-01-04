
/**
 * Code details fileds:
 * code: unique identifier also used in SAP system
 * details: details showed in browser
 */
export interface codeDetails{
    code: string, 
    details: string,
}

export interface IndustryFieldCode extends codeDetails {}
export interface PaymentTerm extends codeDetails {}
export interface IndustryField extends codeDetails {}
export interface CompanyCode extends codeDetails {}
export interface LegalForm extends codeDetails {}
export interface Title extends codeDetails {}
export interface Salutation extends codeDetails {}
export interface Country extends codeDetails {}

