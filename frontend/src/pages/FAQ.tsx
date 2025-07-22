import React from "react";

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8 text-pink-500">FAQ</h1>
      <ul className="space-y-6">
        <li>
          <strong>How do I create an account?</strong><br/>
          Go to the Sign up page and fill in your details.
        </li>
        <li>
          <strong>How do I reset my password?</strong><br/>
          On the login page, click "Forgot password?" (feature coming soon).
        </li>
        <li>
          <strong>How do I track my order?</strong><br/>
          Go to My Orders (feature coming soon).
        </li>
        <li>
          <strong>What payment methods are accepted?</strong><br/>
          We accept credit cards and PayPal.
        </li>
      </ul>
    </div>
  );
} 