export interface Account {
    email: string,
    username: string,
    companyCode: string,
    role: string,
    blocked?: boolean,
    password?: string
}

export interface AccountJWT {
    idToken: string,
    expiresIn: string,
    account: Account
}

export interface AccountDTO {
    account?: Account,
    message?: string,
    error?: string
}