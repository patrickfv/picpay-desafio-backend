
export type User = {
    id: number
    name: string
    email: string
    password: string
    cpfCnpj: string
    userType: USER_TYPE
    walletValue: number
}

export enum USER_TYPE {
    common = 1,
    shopkeeper = 2
}

export type Transaction = {
    id: number
    value: number
    payee: User
    payer: User
    datetime: number
}