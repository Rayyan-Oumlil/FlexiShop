import { useState } from "react";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8">
        Have a question, feedback, or need help? Reach out to us and our team will get back to you as soon as possible.
      </p>
      <div className="mb-8">
        <h2 className="text-xl font-bold text-pink-500 mb-2">Contact Information</h2>
        <p className="text-gray-700 mb-1">Email: <a href="mailto:contact@flexishop.com" className="text-pink-600 hover:underline">contact@flexishop.com</a></p>
        <p className="text-gray-700">Phone: <a href="tel:+15551234567" className="text-pink-600 hover:underline">+1 555 123 4567</a></p>
      </div>
      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-xl font-bold text-pink-500 mb-4">Send us a message</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center py-8">Thank you! Your message has been sent.</div>
        ) : (
          <form
            className="space-y-6"
            onSubmit={e => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div>
              <label className="block text-gray-700 mb-1">Your Name</label>
              <input type="text" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Your Email</label>
              <input type="email" className="w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Message</label>
              <textarea className="w-full border rounded px-3 py-2" rows={4} required></textarea>
            </div>
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-2 rounded-full transition">Send</button>
          </form>
        )}
      </div>
    </div>
  );
} 