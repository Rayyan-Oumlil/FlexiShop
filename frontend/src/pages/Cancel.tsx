import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { XCircle } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      <XCircle className="w-20 h-20 text-destructive mb-6" />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Your payment has been cancelled. You can try again or modify your cart.
      </p>
      <Link to="/cart">
        <Button size="lg">Return to Cart</Button>
      </Link>
    </div>
  );
}
