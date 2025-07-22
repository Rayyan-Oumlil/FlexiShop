import React from "react";

export default function Partner() {
  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-pink-500">Partner with Us</h1>
      <p className="text-gray-700 mb-4">Want to collaborate or add your products to our shop? Fill out the form below and our team will contact you!</p>
      <form className="space-y-4">
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
        <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-6 py-2 rounded">Send</button>
      </form>
    </div>
  );
} 