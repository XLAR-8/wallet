"use client";
import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
export const ToolList = () => {

    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('CREDIT');
    const [transactionType, setTransactionType] = useState('CREDIT');
    const [responseMessage, setResponseMessage] = useState('');
    const [showTransactions, setShowTransactions] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState({ limit: 5, skip: 0 });
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const [walletDetails, setWalletDetails] = useState({ walletId: '', walletBalance: '', name: '' });
    const [walletId, setWalletId] = useState('');



    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleTransactionTypeChange = (e) => {
        setTransactionType(e.target.value);
    };

    // New handler for walletId change
    const handleWalletIdChange = (e) => {
        setWalletId(e.target.value);
    };

    const toggleTransactions = () => {
        setShowTransactions(!showTransactions);
        fetchTransactions();
    };

    const sortTransactions = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    const sortedTransactions = React.useMemo(() => {
        let sortableItems = [...transactions];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [transactions, sortConfig]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
  
            const data = {
                amount: parseFloat(amount),
                description: description
            };
            
            const response = await fetch('http://0.0.0.0:3001/wallet/v1.0/transact/'+walletId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log("response is", response.ok)

            if (!response.ok) {
                alert(`Transaction failed:  ${response.status}  ${response.statusText} `);
                throw new Error('Network response was not ok');
               
            }
            
            
            const responseData = await response.json();
            setResponseMessage(JSON.stringify(responseData));

            
            console.log('Transaction successful');
            alert('Transaction successful');
            fetchWalletDetails(walletId);
        } catch (error) {
            console.error('Error submitting transaction:', error.message);
            

        }
    };
   
    const fetchWalletDetails = async (id) => {
        try {
            const response = await fetch(`http://0.0.0.0:3001/wallet/v1.0/wallet/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log("set wallet", { 
                walletId: responseData.walletId, 
                walletBalance: responseData.balance, 
                name: responseData.name 
            })
            setWalletDetails({ 
                walletId: responseData.id, 
                walletBalance: responseData.balance, 
                name: responseData.name 
            });
        } catch (error) {
            console.error('Error fetching wallet details:', error.message);
        }
    };


    const fetchTransactions = async () => {
        try {
            const { limit, skip } = pagination;
            const response = await fetch(`http://0.0.0.0:3001/wallet/v1.0/transactions?walletId=${walletId}&limit=${limit}&skip=${skip}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            if (responseData.length > 0) {
                setTransactions(prev => [...prev, ...responseData]);
                setPagination(prev => ({ ...prev, skip: prev.skip + 1 }));
            }
        } catch (error) {
            console.error('Error fetching transactions:', error.message);
        }
    };


    
    
    useEffect(() => {
        fetchTransactions();
    }, [pagination.limit, pagination.skip]);

    
    const convertUTCDateToIST = (utcDate) => {
        const date = new Date(utcDate);
      
    
        // Format: DD/MM/YYYY HH:MM
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };
    useEffect(() => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'walletId') {
                setWalletId(value);
                break;
            }
        }
    }, []);
    
    useEffect(() => {
        if (walletId) {
            fetchWalletDetails(walletId);
        }
    }, [walletId]);
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col flex-grow">
                {/* First div */}
                <div className="flex-1   text-orange-500 p-4">
                    {/* Render the first form */}
                    <div className="bg-gray-100   ">
                <p>Wallet ID: {walletDetails.walletId}</p>
                <p>Wallet Balance: {walletDetails.walletBalance}</p>
                <p>Name: {walletDetails.name}</p>
            </div>
            
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                                Amount
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-orange-500 leading-tight focus:outline-none focus:shadow-outline"
                                id="amount"
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={handleAmountChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-orange-500 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                            >
                                <option value="CREDIT">Credit</option>
                                <option value="DEBIT">Debit</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    
                </div>

            
               
                
            </div>
            <div className="flex flex-col h-screen">
    <div className="flex justify-center my-4">
    <button onClick={toggleTransactions} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded w-40 h-10 text-sm">
        {showTransactions ? 'Hide' : 'Check'} Transactions
    </button>
</div>

{showTransactions && (
    <>
        <CSVLink data={transactions} filename={"transactions.csv"} className="btn btn-green mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Export CSV
        </CSVLink>
        <div className="overflow-auto" style={{ maxHeight: 'calc(10 * 2rem)' }}>
            <table className="min-w-full">
                <thead>
                    <tr>
                       
                        <th onClick={() => sortTransactions('id')}>Id</th>
                        <th onClick={() => sortTransactions('amount')}>Amount</th>
                        <th onClick={() => sortTransactions('type')}>Type</th>
                        <th onClick={() => sortTransactions('pre_balance')}>Pre Balance</th>
                        <th onClick={() => sortTransactions('post_balance')}>Final Balance</th>
                        <th onClick={() => sortTransactions('date')}>Date</th>
                    </tr>
                </thead>
                <tbody>
                {sortedTransactions
                        .filter((transaction, index, self) =>
                            index === 0 || transaction.id !== self[index - 1].id)
                        .map((transaction, index) => (
                            <tr key={index}>
                                
                                <td>{transaction.id}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.pre_balance}</td>
                                <td>{transaction.post_balance}</td> 
                                <td>{convertUTCDateToIST(transaction.date)}</td> 
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
)}

</div>
     </div>
    );
};