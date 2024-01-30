import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { walletController } from "../../controllers";
import  WalletRequestBody  from "../../data/model/request/WalletRequest";

export default (fastify: FastifyInstance, options: FastifyPluginOptions, done: Function) => {

    
    fastify.post<{ Body: WalletRequestBody  }>(
        "/setup-wallet",
        async (request, reply) => {
                const { name, initialBalance } = request.body;
                return await walletController.setupWallet(name, initialBalance, reply);
        }
    );

    fastify.get<{ Params: { id: string } }>(
        "/wallet/:id",
        async (request, reply) => {
                const walletId = parseInt(request.params.id);
                return await walletController.fetchWallet(walletId, reply);        
        }
    );
   
    done();
}

