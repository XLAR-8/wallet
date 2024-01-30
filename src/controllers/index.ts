import WalletController from "./WalletController"
import TransactionController from "./TransactionController"
import {
    walletService, transactionService
} from "../services"

const walletController = new WalletController(walletService)
const transactionController = new TransactionController(transactionService)
export {walletController , transactionController}
