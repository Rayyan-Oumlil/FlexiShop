import React from "react";

export default function CancelOrder() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-pink-500">Cancel Order</h1>
      <p className="text-lg text-gray-700 mb-4">To cancel an order, please contact support as soon as possible with your order number. If your order has not shipped yet, we will cancel it and issue a refund.</p>
      <p className="text-gray-600">You can also <a href="/report-problem" className="text-pink-400 hover:underline">report a problem</a> if you need further assistance.</p>
    </div>
  );
} 