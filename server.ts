import fastify from 'fastify';
// import RequestContext from "./context";
// app.decorateRequest("getContext", RequestContext.decorator);
import routes from "./src/routes/index"
import fastifyCors from '@fastify/cors'; // Import @fastify/cors



const app = fastify({
    logger: {
        level: 'info',
        redact: ['err.config'],
    },
    requestIdHeader: "x-request-id",
    requestIdLogLabel: "requestId",
})

// Register the @fastify/cors plugin
app.register(fastifyCors, {
    origin: true,  // Allow requests from any origin
    methods: ['*'], // Allow only POST requests
})


const apiPrefix = "/wallet/"

if (console.log) console.log = (...args) => app.log.info(args)
if (console.error) console.error = (...args) => app.log.error(args)

app.get("/health", (_, reply) => reply.send("Welcome to wallet backend"));


(async () => {
    
    routes(app, apiPrefix);
    await app.listen({ port: 3001, host: "0.0.0.0" });
    await app.ready()

})();



/*
setup wallet -> POST /setup
transaction from wallet -> POST /transact/:walletId  
Fetch transactions -> GET /transactions?walletId={walletId}&skip={skip}&limit={limit}
get wallet details -> → GET /wallet/:id



CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `wallet_id` bigint(20) NOT NULL,
  `type` enum('CREDIT','DEBIT') DEFAULT NULL,
  `pre_balance` DECIMAL(13, 4) NOT NULL,,
  `balance` DECIMAL(13, 4) NOT NULL,,
  `post_balance` DECIMAL(13, 4) NOT NULL,,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (wallet_id) REFERENCES Wallet(id) ON DELETE CASCADE,
  KEY `wallet_id` (`wallet_id`),

) ENGINE=InnoDB AUTO_INCREMENT=3840046 DEFAULT CHARSET=utf8mb4



-- DDL for Wallet table
CREATE TABLE Wallet (
    id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



ACCOUNT ->  
TRANSACTION -> 
*/