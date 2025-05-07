import { useEffect, useState } from "react";
import WalletApi from "../services/api";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const wallet_balance = await WalletApi.getBalance();
        setBalance(wallet_balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    }

    fetchBalance();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
          Wallet Dashboard
        </h1>

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-6 shadow-inner flex flex-col items-center justify-center mb-8">
          <span className="text-lg uppercase tracking-wide">
            Current Balance
          </span>
          <span className="text-4xl font-bold mt-2">{balance}</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm">
            Deposit Funds
          </button>
          <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition shadow-sm">
            View Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
