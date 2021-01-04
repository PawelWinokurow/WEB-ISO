export interface SharedMask {
    IV_PARTNERCATEGORY: string; //1: Person 2: Organization
    IV_PARTNERGROUP: string,    //01: Debitor/Kreditor
    IS_CENTRALDATAPERSON: {
        FIRSTNAME: string;
        LASTNAME: string;
        TITLE_ACA1: string;
        BIRTHDATE: string;      //YYYYMMDD
    }
    IS_ADDRESS: {
        C_O_NAME: string;       //Zus. Namensangaben (c/o)
        CITY: string;           
        POSTL_COD1: string;     //PLZ
        POSTL_COD2: string;     //Postfach PLZ
        PO_BOX: string;         //Postfach
        STREET: string;
        HOUSE_NO: string;
        COUNTRY: string;
    },
    IS_CENTRALDATAORGANIZATION: {
        LEGALFORM: string;
    }

    //interfaceNumber
    //salutation
    //phone
    //fax
    //mobile
    //email
    //mailbox
    //zipMailbox

    //taxId
    //vatId
    //industryFieldCode
    //industryField
    //iban
    //bic
    //bank
    //paymentTerm
    //notes
    //sepa
    //agb
    //creditLimit
    //orgaPersons

    //salutation
    //title
    //firstName
    //secondName
    //birthDate
    //phone
    //mobile
    //email

    //salutation1
    //title1
    //firstName1
    //secondName1
    //birthDate1
    //phone1
    //mobile1
    //email1

    //salutation2
    //title2
    //firstName2
    //secondName2
    //birthDate2
    //phone2
    //mobile2
    //email2

    //companyCode
}

export interface SharedMask2 {
    //IV_PARTNERCATEGORY: string; //1: Person 2: Organization
    //IV_PARTNERGROUP: string,    //01: Debitor/Kreditor
    IS_EXTERN: {
        PARTNER: {
            CENTRAL_DATA: {
                COMMON: {
                    DATA: {
                        BP_PERSON: {
                            FIRSTNAME: string;
                            LASTNAME: string;
                            TITLE_ACA1: string;
                            BIRTHDATE: string;      //YYYYMMDD
                        }
                    }
                }

            }







        }
    }

    IS_ADDRESS: {
        C_O_NAME: string;       //Zus. Namensangaben (c/o)
        CITY: string;           
        POSTL_COD1: string;     //PLZ
        POSTL_COD2: string;     //Postfach PLZ
        PO_BOX: string;         //Postfach
        STREET: string;
        HOUSE_NO: string;
        COUNTRY: string;
    },
    IS_CENTRALDATAORGANIZATION: {
        LEGALFORM: string;
    }

    //interfaceNumber
    //salutation
    //phone
    //fax
    //mobile
    //email
    //mailbox
    //zipMailbox

    //taxId
    //vatId
    //industryFieldCode
    //industryField
    //iban
    //bic
    //bank
    //paymentTerm
    //notes
    //sepa
    //agb
    //creditLimit
    //orgaPersons

    //salutation
    //title
    //firstName
    //secondName
    //birthDate
    //phone
    //mobile
    //email

    //salutation1
    //title1
    //firstName1
    //secondName1
    //birthDate1
    //phone1
    //mobile1
    //email1

    //salutation2
    //title2
    //firstName2
    //secondName2
    //birthDate2
    //phone2
    //mobile2
    //email2

    //companyCode
}









