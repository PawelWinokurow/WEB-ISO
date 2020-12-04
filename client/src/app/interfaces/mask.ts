export interface Mask {
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





    }



}