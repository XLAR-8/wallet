
export enum TransactionType {
    CREDIT = "CREDIT",
    DEBIT = "DEBIT"
}

export interface TransactionRequestBody {
    amount: number,
    description: TransactionType
}

export interface TransactionRequestQuery{
    walletId: string,
    skip: string,
    limit: string
}

