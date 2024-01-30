import BaseController from "./BaseController";
import {FastifyReply} from "fastify";
import  TransactionService from "../services/TransactionService"
import { TransactionType } from "../data/model/request/TransactionRequest";


export default class SearchController extends BaseController {

    private transactionService: TransactionService

    constructor(
        transactionService: TransactionService
    ) {
        super()
        this.transactionService = transactionService
    }

    
    public async recordTransaction(walletId: number, amout: number, description: TransactionType, res: FastifyReply) {
        return this.transactionService.recordTransaction(walletId, amout, description).then((result) => {

            this.ok(res, result)
        }).catch((err) => {
                this.fail(res, err)
        }) 
    }

    public async fetchTransactions(walletId: string, skip: string, limit: string, res: FastifyReply) {
        return this.transactionService.fetchTransactions(walletId, skip, limit).then((result) => {

            this.ok(res, result)
        }).catch((err) => {
                this.fail(res, err)
        }) 
    }

    

}
