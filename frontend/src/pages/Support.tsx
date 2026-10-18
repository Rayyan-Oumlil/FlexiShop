import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, HelpCircle, Mail, Package, User } from "lucide-react";

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

const supportLinks = [
  { icon: HelpCircle, label: "FAQ", href: "/faq" },
  { icon: Mail, label: "Contact Us", href: "/contact-us" },
  { icon: Package, label: "Order History", href: "/cart" },
  { icon: User, label: "Account Management", href: "/account-management" },
];

export default function Support() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Support Center</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Need help? Find answers to common questions, access resources, or contact our support team.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {supportLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              to={link.href}
              className="bg-card border border-border rounded-lg p-6 flex flex-col items-center hover:bg-accent transition-colors"
            >
              <Icon className="w-8 h-8 mb-3 text-primary" />
              <span className="font-semibold">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Common Issues</h2>
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
      </div>

      <div className="text-center text-muted-foreground">
        Still need help? <Link to="/contact-us" className="text-primary hover:underline font-semibold">Contact our support team</Link>.
      </div>
    </div>
  );
}
