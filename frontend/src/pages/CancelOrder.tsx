import { useState } from "react";

export default function CancelOrder() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">Order Canceling</h1>
      <p className="text-lg text-gray-700 mb-8">
        Need to cancel an order? Fill out the form below and our team will process your request as soon as possible. Please note: Orders can only be canceled before they are shipped.
      </p>
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold text-pink-500 mb-4">Cancel an Order</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center py-8">Your cancellation request has been received. We’ll contact you soon.</div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label className="block text-gray-700 mb-1">Order Number</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Reason for Cancellation</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} required></textarea>
            </div>
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-2 rounded-full transition">Submit Request</button>
          </form>
        )}
      </div>
      <div className="mt-8 text-gray-600 text-sm">
        <strong>Note:</strong> If your order has already shipped, please use our <a href="/contact-us" className="text-pink-600 hover:underline">Contact Us</a> page for further assistance.
      </div>
    </div>
  );
} 