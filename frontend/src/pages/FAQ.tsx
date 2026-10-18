import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your purchase."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, MasterCard, PayPal, Apple Pay, and Google Pay. All payments are securely processed."
  },
  {
    question: "How can I track my order?",
    answer: "After your order ships, you'll receive a tracking link by email. You can also view your order status in your account's Order History section."
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
    answer: "You can reach us via the Contact Us page, by email at contact@flexishop.com, or by phone at +1 555 123 4567."
  },
  {
    question: "Is my personal information safe?",
    answer: "Absolutely. We use industry-standard encryption and never share your data with third parties without your consent."
  },
  {
    question: "How do I cancel my order?",
    answer: "If your order hasn't shipped yet, you can request a cancellation from the Order Canceling page or by contacting support."
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <p className="text-muted-foreground text-lg mb-12">
        Find answers to the most common questions about shopping, orders, returns, and your account. If you can't find what you're looking for, our support team is here to help!
      </p>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              className="w-full text-left font-semibold p-6 focus:outline-none flex justify-between items-center hover:bg-accent/50 transition-colors"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span>{faq.question}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${open === idx ? "rotate-180" : ""}`} />
            </button>
            {open === idx && (
              <div className="px-6 pb-6 text-muted-foreground">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-12 text-muted-foreground">
        Still need help? <Link to="/contact-us" className="text-primary hover:underline font-semibold">Contact our support team</Link>.
      </div>
    </div>
  );
}
