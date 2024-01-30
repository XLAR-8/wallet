import MasterDBDao from "../data/database/dao/MasterDao";
import { TransactionType } from "../data/model/request/TransactionRequest"; 

export default class TransactionService {

    private masterDBDao: MasterDBDao

    constructor(masterDBDao: MasterDBDao) {
        this.masterDBDao = masterDBDao
    }
    
    public async recordTransaction(walletId: number , amount: number, description: TransactionType) {
        return this.masterDBDao.recordTransaction(walletId, amount,description)
    }

    public async fetchTransactions(walletId: string , skip: string, limit: string) {
        return this.masterDBDao.fetchTransactions(walletId, skip,limit)
    }

}