export interface Country {
    name: string, 
    abbreviation: string,
}

export interface codeDetails{
    code: string, 
    details: string,
}

export interface IndustryFieldCode extends codeDetails {}
export interface PaymentTerm extends codeDetails {}
export interface IndustryField extends codeDetails {}

