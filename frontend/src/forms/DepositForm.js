import { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import WalletApi from "../services/api";

export default function DepositForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //so message doesnt exist forever
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return setMessage("Please enter a valid deposit amount.");
    }

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    try {
      setIsSubmitting(true);
      //forgot to replace with api class call after testing
      const res = await WalletApi.deposit({
        amount: numericAmount,
        payment_method_id: paymentMethod.id,
      });

      setMessage(`Deposit successful!`);
      setAmount("");
      cardElement.clear();

      //trigger page refresh on success
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Something went wrong during deposit."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800">Deposit Funds</h2>

      <input
        type="number"
        step="0.01"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (e.g. 25.00)"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
      />

      <CardElement className="p-3 border border-gray-300 rounded-md bg-white" />

      <button
        type="submit"
        disabled={!stripe || isSubmitting} // avoid spam deposits
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Deposit
      </button>

      {message && <p className="text-sm mt-2 text-center">{message}</p>}
    </form>
  );
}
