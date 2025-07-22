import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Browse our products, add items to your cart, and proceed to checkout. You’ll need to create an account or log in to complete your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, PayPal, Apple Pay, and Google Pay. All payments are securely processed."
  },
  {
    question: "How can I track my order?",
    answer: "After your order ships, you’ll receive a tracking link by email. You can also view your order status in your account’s Order History section."
  },
  {
    question: "Can I return or exchange a product?",
    answer: "Yes! You can return or exchange any product within 14 days of delivery. Please visit our Returns page or contact support for help."
  },
  {
    question: "How do I reset my password?",
    answer: "Go to the login page and click on 'Forgot password?'. Follow the instructions to reset your password by email."
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us via the Contact Us page, by email at contact@mystore.com, or by phone at +1 555 123 4567."
  },
  {
    question: "Is my personal information safe?",
    answer: "Absolutely. We use industry-standard encryption and never share your data with third parties without your consent."
  },
  {
    question: "How do I cancel my order?",
    answer: "If your order hasn’t shipped yet, you can request a cancellation from the Order Canceling page or by contacting support."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">Frequently Asked Questions</h1>
      <p className="text-lg text-gray-700 mb-8">
        Find answers to the most common questions about shopping, orders, returns, and your account. If you can’t find what you’re looking for, our support team is here to help!
      </p>
      <div className="mb-10">
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