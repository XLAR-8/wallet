import MasterDBDao from "../data/database/dao/MasterDao";


export default class WalletService {

    private masterDBDao: MasterDBDao

    constructor(masterDBDao: MasterDBDao) {
        this.masterDBDao = masterDBDao
    }
    
    public async setupWallet(name: string, initialBalance:  number) {
        return this.masterDBDao.setupWallet(name, initialBalance)
    }

    public async fetchWallet(walletId: number) {
        return this.masterDBDao.fetchWallet(walletId)
    }
}