import { Link } from "react-router-dom";

export default function CancelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-red-500 text-6xl mb-4">❌</div>
      <h1 className="text-3xl font-bold mb-2">Paiement annulé</h1>
      <p className="mb-6 text-lg">Votre paiement a été annulé. Vous pouvez réessayer ou modifier votre panier.</p>
      <Link to="/cart" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">Retour au panier</Link>
    </div>
  );
} 