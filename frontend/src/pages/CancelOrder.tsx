import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "react-router-dom";
import type React from "react";

export default function CancelOrder() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ orderNumber: "", reason: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ orderNumber: "", reason: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Canceling</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Need to cancel an order? Fill out the form below and our team will process your request as soon as possible. Please note: Orders can only be canceled before they are shipped.
      </p>

      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-bold mb-6">Cancel an Order</h2>
        {submitted ? (
          <div className="text-center py-8">
            <p className="text-green-600 font-semibold">Your cancellation request has been received. We'll contact you soon.</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">Order Number</label>
              <Input
                type="text"
                value={formData.orderNumber}
                onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Reason for Cancellation</label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background min-h-[120px]"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Request
            </Button>
          </form>
        )}
      </div>

      <div className="mt-8 text-muted-foreground text-sm">
        <strong>Note:</strong> If your order has already shipped, please use our <Link to="/contact-us" className="text-primary hover:underline">Contact Us</Link> page for further assistance.
      </div>
    </div>
  );
}
