import { useEffect, useState } from "react";
import WalletApi from "../services/api";
import DepositForm from "../forms/DepositForm";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const { logout, setIsLoading, user } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  async function refreshDashboard() {
    try {
      setIsLoading(true);
      const { wallet_balance } = await WalletApi.getBalance();
      const { transactions } = await WalletApi.getTransactions();
      setBalance(wallet_balance);
      setTransactions(transactions);
    } catch (err) {
      console.error("Error refreshing dashboard", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full px-4 py-2 shadow hover:bg-gray-50 hover:shadow-md transition"
          >
            Log out
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
          Wallet Dashboard
        </h1>
        <p className="text-sm text-center mb-6 text-gray-400">
          {user.username}
        </p>

        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-6 shadow-inner flex flex-col items-center justify-center mb-8">
          <span className="text-lg uppercase tracking-wide">
            Current Balance
          </span>
          <span className="text-4xl font-bold mt-2">{balance}</span>
        </div>

        <div className="flex flex-col items-center w-full space-y-10">
          <div className="w-full max-w-md">
            <DepositForm onSuccess={refreshDashboard} />
          </div>

          <div className="w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Recent Transactions
            </h2>

            <div className="space-y-4">
              {transactions?.length > 0 ? (
                (showAll ? transactions : transactions.slice(0, 6)).map(
                  (txn) => (
                    <div
                      key={txn.id}
                      className="flex justify-between items-center bg-gray-100 rounded-lg p-4"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-400">
                          {new Date(txn.created_at).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">{txn.date}</p>
                      </div>
                      <div
                        className={`text-lg font-semibold ${
                          txn.amount < 0 ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {txn.amount < 0 ? "-" : "+"}$
                        {Math.abs(txn.amount).toFixed(2)}
                      </div>
                    </div>
                  )
                )
              ) : (
                <p className="text-gray-500 text-sm text-center">
                  No transactions found.
                </p>
              )}
            </div>

            {/* Show More button */}
            {transactions?.length > 6 && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={() => setShowAll((prev) => !prev)}
                  className="text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full px-4 py-2 mt-4 shadow hover:bg-gray-50 hover:shadow-md transition"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
