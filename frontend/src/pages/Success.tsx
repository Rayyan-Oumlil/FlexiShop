import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Thank you for your order. You will receive a confirmation email shortly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button size="lg">Return to Home</Button>
        </Link>
        <Link to="/cart">
          <Button variant="outline" size="lg">View Orders</Button>
        </Link>
      </div>
    </div>
  );
}
