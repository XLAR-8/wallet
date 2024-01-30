import { PrismaClient } from '@prisma/client';
import { TransactionRequestBody, TransactionType } from "../../model/request/TransactionRequest"; 
import WalletError from "../../../../utils/WalletError";

export default class MasterDao {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async setupWallet(name: string, initialBalance: number): Promise<any> {
        try {
            return await this.prisma.$transaction(async (prisma) => {
                
                const wallet = await prisma.wallet.create({
                    data: {
                        name: name,
                    },
                });

               
                const transaction = await prisma.transactions.create({
                    data: {
                        wallet_id: wallet.id,
                        type: 'CREDIT',
                        pre_balance: 0,        
                        balance: initialBalance,
                        post_balance: initialBalance, 
                    },
                });

                return {
                    walletId: wallet.id,
                    name: wallet.name,
                    balance: transaction.post_balance, 
                };
            });
        } catch (error) {
            
            throw new WalletError(409, "transaction rolled back")
        }
    }


    async fetchWallet(walletId: number): Promise<any> {
        try {
            if (isNaN(walletId)) {
                throw new WalletError(400, "Invalid wallet id")
            }
            const wallet = await this.prisma.wallet.findUnique({
                where: {
                    id: walletId,
                },
            });
            if (!wallet) {
                throw new WalletError(404, "Wallet not found")
            }
            const latestTransaction = await this.prisma.transactions.findFirst({
                where: {
                    wallet_id: walletId,
                },
                orderBy: {
                    created_at: 'desc', 
                },
            });
            let balance = latestTransaction ? latestTransaction.post_balance : 0;
            return {
                ...wallet,
                balance,
            };
        } catch (error) {
            throw error;
        }
    }
    
    
    async recordTransaction(walletId: number, amount: number, type:TransactionType) {
        try {
            
            if (isNaN(walletId)) {
                throw new WalletError(400, "Invalid wallet id")
            }
            if (typeof amount !== 'number' || amount < 0.0001) {
                throw new WalletError(403, "forbidden amount ; amont cannot be less than .0001")
            }
            if (!['CREDIT', 'DEBIT'].includes(type)) {
                throw new WalletError(400, "Invalid transaction type")
            }
            amount = parseFloat(amount.toFixed(4));

            
            const result = await this.prisma.$transaction(async (prisma) => {
                const latestTransaction = await prisma.transactions.findFirst({
                    where: {
                        wallet_id: walletId,
                    },
                    orderBy: {
                        created_at: 'desc',
                    },
                });
    
                const preBalance = latestTransaction ? latestTransaction.post_balance : 0;
    
                const postBalance = type === 'CREDIT' 
                    ? Number(preBalance) + amount 
                    : Number(preBalance) - amount;

                if (postBalance < 0) {
                    throw new Error('Insufficient balance for debit transaction');
                }
                console.log("preBalance postBalance", preBalance, postBalance)
                const newTransaction = await prisma.transactions.create({
                    data: {
                        wallet_id: walletId,
                        type: type,
                        pre_balance: preBalance,
                        balance: amount,
                        post_balance: postBalance,
                       
                    },
                });
    
                return newTransaction;
            });
    
            return result;
        } catch (error) {
            throw error;
        }
    }

async fetchTransactions(walletIdNum: string, skipNum: string, limitNum: string) {
    try {
        const walletId = parseInt(walletIdNum);
        const skip = parseInt(skipNum) || 0; 
        const limit = parseInt(limitNum) || 5; 

        if (isNaN(walletId)) {
            throw new WalletError(400, "Invalid wallet id")
        }
        
        const transactions = await this.prisma.transactions.findMany({
            where: {
                wallet_id: walletId,
            },
            skip: skip,
            take: limit,
            orderBy: {
                created_at: 'desc',
            },
            select: {
                id: true,
                wallet_id: true,
                balance: true,
                pre_balance: true,
                post_balance: true,
                created_at: true,
                type: true,
            },
        });

        return transactions.map(tx => ({
            id: tx.id,
            walletId: tx.wallet_id.toString(),
            amount: tx.balance,
            post_balance: tx.post_balance,
            pre_balance: tx.pre_balance,     
            date: tx.created_at,
            type: tx.type
        }));
    } catch (error) {
        
        throw error;
    }
}   
}
