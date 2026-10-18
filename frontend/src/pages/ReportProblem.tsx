import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import type React from "react";

export default function ReportProblem() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ email: "", problem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ email: "", problem: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Report a Problem</h1>
      <p className="text-muted-foreground mb-8">
        Found an issue? Let us know and we'll fix it as soon as possible.
      </p>
      {submitted ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-green-600 font-semibold">Thank you! Your report has been submitted.</p>
        </div>
      ) : (
        <form className="bg-card border border-border rounded-lg p-8 space-y-6" onSubmit={handleSubmit}>
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
            <label className="block text-sm font-medium mb-2">Describe the problem</label>
            <textarea
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background min-h-[150px]"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Send Report
          </Button>
        </form>
      )}
    </div>
  );
}
