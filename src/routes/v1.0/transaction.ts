import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { transactionController } from "../../controllers";

import {TransactionRequestBody, TransactionType, TransactionRequestQuery } from "../../data/model/request/TransactionRequest";

export default (fastify: FastifyInstance, options: FastifyPluginOptions, done: Function) => {


    fastify.post<{ Body: TransactionRequestBody, Params: { walletId: string } }>(
        "/transact/:walletId",
        async (request, reply) => {
            const walletId = parseInt(request.params.walletId);
            const { amount, description } = request.body;
                return await transactionController.recordTransaction(walletId,amount, description, reply);        
        }
    );
   
    fastify.get<{ Querystring: TransactionRequestQuery }>('/transactions',
        async (request, reply) => {
        const { walletId, skip, limit } = request.query;

        return await transactionController.fetchTransactions(walletId, skip, limit, reply);
     
    });
    
    done();
}

