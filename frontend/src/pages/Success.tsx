import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-green-500 text-6xl mb-4">✔️</div>
      <h1 className="text-3xl font-bold mb-2">Paiement réussi !</h1>
      <p className="mb-6 text-lg">Merci pour votre commande. Vous recevrez un email de confirmation sous peu.</p>
      <div className="flex gap-4">
        <Link to="/" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">Retour à l'accueil</Link>
        <Link to="/cart" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">Voir mes commandes</Link>
      </div>
    </div>
  );
} 