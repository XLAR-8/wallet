import { FastifyInstance } from "fastify";
import wallet from "./wallet";
import transaction from "./transaction";


export default (app : FastifyInstance, prefix: string) => {
     app.register(wallet, { prefix: prefix });
     app.register(transaction,{ prefix : prefix } );
}
