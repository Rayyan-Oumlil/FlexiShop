import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import type React from "react";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Have a question, feedback, or need help? Reach out to us and our team will get back to you as soon as possible.
      </p>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="space-y-2 text-muted-foreground">
          <p>Email: <a href="mailto:contact@flexishop.com" className="text-primary hover:underline">contact@flexishop.com</a></p>
          <p>Phone: <a href="tel:+15551234567" className="text-primary hover:underline">+1 555 123 4567</a></p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-bold mb-6">Send us a message</h2>
        {submitted ? (
          <div className="text-center py-8">
            <p className="text-green-600 font-semibold">Thank you! Your message has been sent.</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Your Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background min-h-[120px]"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
