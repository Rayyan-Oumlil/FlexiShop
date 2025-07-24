import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I track my order?",
    answer: "Go to your Order History page to see the status and tracking information for all your orders."
  },
  {
    question: "How can I return a product?",
    answer: "Contact our support team via the Contact Us page within 14 days of receiving your product."
  },
  {
    question: "I forgot my password. What should I do?",
    answer: "Use the password reset option on the login page or contact support for help."
  },
  {
    question: "How do I update my account information?",
    answer: "Visit the Account Management page to update your profile or change your password."
  },
];

export default function Support() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">Support Center</h1>
      <p className="text-lg text-gray-700 mb-8">
        Need help? Find answers to common questions, access resources, or contact our support team.
      </p>
      <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/faq" className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:bg-pink-50 transition">
          <span className="text-3xl mb-2">❓</span>
          <span className="font-bold text-pink-500">FAQ</span>
        </Link>
        <Link to="/contact-us" className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:bg-pink-50 transition">
          <span className="text-3xl mb-2">📧</span>
          <span className="font-bold text-pink-500">Contact Us</span>
        </Link>
        <Link to="/order-history" className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:bg-pink-50 transition">
          <span className="text-3xl mb-2">📦</span>
          <span className="font-bold text-pink-500">Order History</span>
        </Link>
        <Link to="/account-management" className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:bg-pink-50 transition">
          <span className="text-3xl mb-2">👤</span>
          <span className="font-bold text-pink-500">Account Management</span>
        </Link>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-pink-500 mb-6">Common Issues</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-5">
              <button
                className="w-full text-left font-semibold text-pink-600 focus:outline-none flex justify-between items-center"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                {faq.question}
                <span>{open === idx ? "−" : "+"}</span>
              </button>
              {open === idx && <div className="mt-2 text-gray-700 text-sm">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm">
        Still need help? <Link to="/contact-us" className="text-pink-600 hover:underline">Contact our support team</Link>.
      </div>
    </div>
  );
} 