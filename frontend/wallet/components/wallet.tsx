"use client";
import React, { useState, useEffect } from 'react';
import { ToolList } from "@/components/ToolList";
// import { Wallet } from "@/components/Wallet";
export const Wallet = () => {
    const [walletName, setWalletName] = useState('');
    const [startingAmount, setStartingAmount] = useState('');
    const [walletId, setWalletId] = useState(null); 

    // Check for the walletId cookie when the component mounts
    useEffect(() => {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'walletId') {
                console.log("walletid", value)
                setWalletId(value);
                break;
            }
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://0.0.0.0:3001/wallet/v1.0/setup-wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: walletName,
                    initialBalance: parseInt(startingAmount)
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Extract wallet details from response
            const data = await response.json();
            const { walletId, name, balance } = data;

            // Save wallet details in cookies
            document.cookie = `walletId=${walletId}`;
            document.cookie = `walletName=${name}`;
            document.cookie = `walletBalance=${balance}`;

            console.log('Wallet setup successful');
        } catch (error) {
            console.error('Error setting up wallet:', error.message);
        }
    };

return (
    <div className="flex flex-col ">
        {walletId ? (
            
            <div>
                {/* <div>Wallet ID: {walletId}</div> */}
               < ToolList/>
            </div>
        ) : (
            // Display the wallet setup form if walletId doesn't exist
            <div className='items-center'>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="walletName">
                        Wallet Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-orange-100"
                        id="walletName"
                        type="text"
                        placeholder="Enter wallet name"
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startingAmount">
                        Starting Amount
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-orange-100"
                        id="startingAmount"
                        type="number"
                        placeholder="Enter starting amount"
                        value={startingAmount}
                        onChange={(e) => setStartingAmount(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form></div>
        )}
    </div>
);
};