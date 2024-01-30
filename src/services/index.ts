
import {MasterDBDao} from "../data/database/dao";

import WalletService from "./WalletService";
import TransactionService from "./TransactionService";

const walletService = new WalletService(MasterDBDao)
const transactionService = new TransactionService(MasterDBDao)

export {
    walletService,transactionService
}

