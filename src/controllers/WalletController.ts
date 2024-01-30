import BaseController from "./BaseController";
import {FastifyReply} from "fastify";
import  WalletService from "../services/WalletService"

export default class SearchController extends BaseController {

    private walletService: WalletService

    constructor(
        walletService: WalletService
    ) {
        super()
        this.walletService = walletService
    }

    public async setupWallet(name: string, initialBalance:  number, res: FastifyReply) {
        return this.walletService.setupWallet(name, initialBalance).then((widget) => {

            this.ok(res, widget)
        }).catch((err) => {
                this.fail(res, err)
        }) 
    }

    public async fetchWallet(walletId: number, res: FastifyReply) {
        
        return this.walletService.fetchWallet(walletId).then((widget) => {
            this.ok(res, widget)
        }).catch((err) => {
                this.fail(res, err)
        }) 
    }

}
